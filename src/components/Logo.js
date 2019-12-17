import React from "react";
import { tsPropertySignature } from "@babel/types";

export default function Logo(props) {
    return (
      <div className="Logo component">
        <img
        src="../../public/logo.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Scratch logo"
        />
      </div>
    );
  }

