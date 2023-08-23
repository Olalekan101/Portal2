import { FiChevronDown, FiDownload, FiEye, FiFileMinus } from "react-icons/fi";
import Actions from "./Actions.module.css";
import { useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import ClickAwayListener from "../ClickAwayListener";
import { getMyPermissions } from "../../../../../utils/functions/GetMyPermissions";
import { generateFileURL } from "../../../../../utils/functions/ResourceFunctions";

export function PageActions({ children, actions }) {
  const [open, setOpen] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  useEffect(() => {
    setUserPermissions(getMyPermissions());
  }, []);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div
        // onMouseLeave={() => setOpen(false)}
        className={Actions?.more_options}
      >
        <button onClick={() => setOpen(!open)} className={Actions?.button}>
          <span>Action</span> <FiChevronDown />
        </button>
        {open && (
          <div style={{ top: "45px" }} className={Actions.more_options_modal}>
            {children?.map?.((action) => {
              if (
                !action?.permissions ||
                action?.permissions === "" ||
                userPermissions?.includes(action?.permissions)
              ) {
                return (
                  <>
                    {action?.condition === true ? (
                      <></>
                    ) : (
                      <button
                        className={Actions?.more_action_button}
                        onClick={() => action?.action()}
                      >
                        {action?.name}
                      </button>
                    )}
                  </>
                );
              }
              return <></>;
            })}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export function TableActions({ children, rowData, url }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div
        // onMouseLeave={() => setOpen(false)}
        className={`${Actions?.more_options} ${Actions?.more_options_tables}`}
        
      >
        <div>
          {" "}
          {url && (
            <button
              onClick={() => navigate(url)}
              className={`${Actions?.button} ${
                children && Actions?.half_border_left
              }`}
            >
              <FiEye />
            </button>
          )}
          {children && (
            <button
              onClick={() => setOpen(!open)}
              className={`${Actions?.button} ${
                children && Actions?.half_border_right
              } }`}
            >
              <FiChevronDown />
            </button>
          )}
        </div>
        {open && (
          <div className={Actions.more_options_modal}>
            {children?.map?.((action, idx) => (
              <button
                key={idx}
                className={Actions.more_action_button}
                onClick={() => {
                  setOpen(false);
                  action?.action(rowData);
                }}
              >
                {action?.icon && <span style={{marginRight: "10px"}}>{action?.icon}</span>}
                {action?.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export function TableActionsDownload({ children, actions, url, file }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const p = !url ? generateFileURL?.(file) : "";

  console.log(p);
  //
  return (
    <div
      onMouseLeave={() => setOpen(false)}
      className={`${Actions?.more_options} ${Actions?.more_options_tables}`}
    >
      <div>
        {" "}
        <a href={p || url} target="_blank" rel="noopener noreferrer">
          <button
            type={"button"}
            style={{
              padding: "0.57rem",
              borderRadius: "4px 0px 0px 4px",
              backgroundColor: "#6E9170",
            }}
            // onClick={() => window.location.replace(p)}
            className={Actions?.button}
          >
            <FiEye />
          </button>
        </a>
        {actions && (
          <button
            type={"button"}
            style={{ padding: "0.57rem", borderRadius: "0px 4px 4px 0px" }}
            onClick={() => actions?.()}
            className={`${Actions?.button} }`}
          >
            <FiFileMinus />
          </button>
        )}
      </div>
    </div>
  );
}

export function EditTableActionsDownload({ children, actions, url }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  console.log(url);

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      className={`${Actions?.more_options} ${Actions?.more_options_tables}`}
    >
      <div>
        {" "}
        <button
          type={"button"}
          style={{
            padding: "0.57rem",
            borderRadius: "4px 0px 0px 4px",
            backgroundColor: "#6E9170",
          }}
          onClick={() => navigate(url)}
          className={Actions?.button}
        >
          <FiEye />
        </button>
        <button
          type={"button"}
          style={{ padding: "0.57rem", borderRadius: "0px 4px 4px 0px" }}
          onClick={() => navigate(url)}
          className={`${Actions?.button} }`}
        >
          <FiDownload />
        </button>
      </div>
    </div>
  );
}