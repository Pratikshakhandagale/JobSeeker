import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import style from "./pdf.module.css";

const PDFViewer = (url) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  /*To Prevent right click on screen*/
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  // });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
   
    <div>
      <div className={style.Example__container}>
        <div className={style.Example__container__document}>
          <Document
          className={style.docWidth}
          file={url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page width={50} scale={7}  className={style.page} pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
      <div>
          <div>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <div className={style.buttonc}>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className={style.previous}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className={style.next}
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default PDFViewer;
