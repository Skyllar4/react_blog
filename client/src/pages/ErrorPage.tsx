import React from "react";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {

    const error = useRouteError() as Error;

    return  <div id="error-page">
                <h1 className="err-msg">404</h1>
                <p>
                <i>{error.message}</i>
                </p>
            </div>

}
