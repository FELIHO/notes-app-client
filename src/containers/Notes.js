import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Notes.css";

export default function Notes(props) {

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [attachmentURL, setAttachmentURL] = useState(null);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      let attachmentURL;
      const note = await getNote();
      const { content, attachment } = note;

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }

      setNote(note);
      setContent(content);
      setAttachmentURL(attachmentURL);

    } catch (e) {
      alert(e);
    }
  }

  async function getNote() {
    return API.get("notes", `/notes/${props.match.params.id}`);
  }

  async function saveNote(note) {
    return API.put("notes", `/notes/${props.match.params.id}`, {
      body: note
    });
  }

  async function deleteNote() {
    // Delete attachement if the attachment exists.
    if (attachmentURL !== "") {
      Storage.vault.remove(attachmentURL);
    }
    return API.del("notes", `/notes/${props.match.params.id}`);
  }

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    setIsLoading(true);

    try {
      if (file) {
        attachment = await s3Upload(file);
      }

      await saveNote({
        content: content,
        attachment: attachment || note.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Notes">
      {note &&
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={e => setContent(e.content)}
              value={content}
              componentClass="textarea"
            />
          </FormGroup>
          {note.attachment &&
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={attachmentURL}
                >
                  {formatFilename(note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>}
          <FormGroup controlId="file">
            {!note.attachment &&
              <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={e => setFile(e.target.files[0])} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!validateForm()}
            type="submit"
            isLoading={isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={isDeleting}
            onClick={handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
        </form>}
    </div>
  );

}
