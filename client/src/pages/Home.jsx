import { Button, Col, Form, Layout, Row } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderCom from '../Components/Header'
import FooterCom from '../Components/Footer'
import html2pdf from "html2pdf.js";



const Home = () => {
    const [pdfDownloadUrl, setPdfDownloadUrl] = useState("");
    const [selectedBook, setSelectedBook] = useState(null)

    const handleBookData = [
        {
          bookname: "Srimad Bhagavad Gita",
          writer: "Maharishi Veda Vyasa"
        },
        {
          bookname: "Without Fear: The Life & Trial of Bhagat Singh.",
          writer: "Kuldip Nayar"
        },
        {
          bookname: "Veer Savarkar: Echoes from a Forgotten Past",
          writer: "Vikram Sampath"
        },
        {
          bookname: "The Great Tragedy of India's Partition ",
          writer: "S.S. Sharma"
        },
        {
          bookname: "Syama Prasad Mookerjee: A Life: Life and Times",
          writer: "Tathagata Roy"
        },
        {
          bookname: "Syama Prasad Mookerjee: A Life: Life and Times",
          writer: "Tathagata Roy"
        },
        {
          bookname: "Syama Prasad Mookerjee: A Life: Life and Times",
          writer: "Tathagata Roy"
        },
        {
          bookname: "Syama Prasad Mookerjee: A Life: Life and Times",
          writer: "Tathagata Roy"
        },
        {
          bookname: "Syama Prasad Mookerjee: A Life: Life and Times",
          writer: "Tathagata Roy"
        }
    ]


    // const handlePdfGenerator = () => {
    //     //document.querySelector('.text-rainbow-animation').classList.add('active');
    //     // present("Generating Pdf...");
    //     // generatePDF();
    //     setTimeout(() => {
    //       generatePDF();
    //     }, 3000);
    // };

    const generatePDF = async () => {
      debugger
      if(!selectedBook) {
        console.log("No book selected for PDF generation.");
        return;
      }

      // console.log("pdf function");
      // // present("Generating Pdf...");
      // var element = document.getElementById("PdfFile");

      const options = {
        margin: 8,
        // filename: `eCAF_${CustomerRigestrationForm.crfNo}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 1.3,
          logging: true,
          dpi: 192,
          letterRendering: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      const content = document.getElementById("PdfFile");

      try {
        const pdf = await html2pdf().from(content).set(options).outputPdf()
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const pdfFileURL = URL.createObjectURL(blob);

        // Download the generated PDF
        const a = document.createElement('a');
        a.href = pdfFileURL;
        a.download = `${selectedBook.bookname}.pdf`;
        a.click();

        URL.revokeObjectURL(pdfFileURL);

      } catch (error) {
        console.log('PDF generation error:', error)
      }
     
      // handleModalClose();
        // html2pdf()
        //   .set(options)
        //   .from(element)
        //   .toPdf()
        //   .get("pdf")
        //   .then(function (pdf) {
        //     var totalPages = pdf.internal.getNumberOfPages();
        //     for(var i = 1; i <= totalPages; i++) {
        //       pdf.setPage(i);
        //       pdf.setFontSize(6);
        //       pdf.setTextColor(150);
        //       pdf.text("Budanta Networks Pvt Ltd", 10, 290);
        //       pdf.text("Page " + i + " of " + totalPages, 180, 290);
        //     //   pdf.addImage(
        //     //     // Watermark,
        //     //     "PNG",
        //     //     40,
        //     //     60,
        //     //     150,
        //     //     150,
        //     //     "SOME-IMAGE-ID",
        //     //     "FAST"
        //     //   );
        //     }
    
        //     let pdfFile = new File(
        //       [pdf.output("blob")],
        //       `eCAF_${handleBookData.bookname}.pdf`,
        //       {
        //         type: "application/pdf",
        //       }
        //     );
        //     console.log(pdfFile);
        //     let formData = new FormData();
        //     formData.append("file", pdfFile);
        //     fetch(`http://localhost:8000/uploadpdf`, {
        //       method: "POST",
        //       body: formData,
        //       headers: {
        //         Accept: "application/json",
        //       },
        //     })
        //       .then((res) => res.json())
        //       .then(async (jsondata) => {
        //         console.log(jsondata);  // presentAlert({
        //             //   header: "Success",
        //             //   message: "Pdf Generated Successfully",
        //             //   buttons: [
        //             //     {
        //             //       text: "Download Pdf",
        //             //       handler: () => {
        //             //         window.open(
        //             //           `http://localhost:8000/${downloadUrl}`,
        //             //           "_system"
        //             //         );
        //             //       },
        //             //     },
        //             //   ],
        //             // });
        //         // dismiss();
        //         const payload = {
        //           status: "PAYMENT PENDING",
        //         };
        //         // await UpdateFormData(payload, id);
        //         // await sendConfirmationSms();
        //         let downloadUrl = jsondata.data.replace(/\\/g, "/");
        //         setPdfDownloadUrl(
        //           `http://localhost:8000/${downloadUrl}`
        //         );
        //         // await sendEmail(
        //         //   CustomerRigestrationForm.crfNo,
        //         //   `${process.env.REACT_APP_API_URL}/${downloadUrl}`
        //         // );
        //         let Pdfpayload = {
        //           eCAF_PDF: `http://localhost:8000/${downloadUrl}`,
        //         };
        //         // UpdateFormData(Pdfpayload, id);
        //         // presentAlert({
        //         //   header: "Success",
        //         //   message: "Pdf Generated Successfully",
        //         //   buttons: [
        //         //     {
        //         //       text: "Download Pdf",
        //         //       handler: () => {
        //         //         window.open(
        //         //           `http://localhost:8000/${downloadUrl}`,
        //         //           "_system"
        //         //         );
        //         //       },
        //         //     },
        //         //   ],
        //         // });
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       });
        //   });
    };


    // const downloadpdf = async () => {
    //     // console.log("downloading pdf", downloadUrl);
    //     let url = await Preferences.get({ key: "downloadUrl" });
    //     console.log("downloading pdf", url.value);
    //     window.open(url.value, "_system");
    //     await Preferences.remove({ key: "downloadUrl" });
    // };

    return (
        <>
            <HeaderCom />
            <Layout className="mainDiv">
                <Row>
                    <Col>
                        <h1>                     
                            "Access free books with valuable insights that have a profound impact on 
                            the lives of all Indians. Click the 'Details' button to start reading these
                            books. Additionally, you can create and publish your own notebook or book."
                        </h1>
                    </Col>
                </Row>
                <Row>
                    {
                      handleBookData && handleBookData.map((item, index) => (
                        <React.Fragment key={index}>
                          <Col
                            xs={24}
                            sm={24}
                            md={8}
                            lg={12}
                            xl={12}
                          >
                            <p>{item.bookname}</p>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={8}
                            lg={6}
                            xl={6}
                          >
                            <p>{item.writer}</p>
                          </Col>
                          <Col
                            xs={24}
                            sm={24}
                            md={8}
                            lg={6}
                            xl={6}
                          >
                            <Button 
                              htmlType='submit' 
                              type='primary' 
                              onClick={() => 
                                setSelectedBook(item)
                              }
                            >
                              Details
                            </Button>
                          </Col>
                        </React.Fragment>
                      )
                        // return (
                        //     <>
                        //         <Col
                        //             xs={24}
                        //             sm={24}
                        //             md={8}
                        //             lg={12}
                        //             xl={12}
                        //         >
                        //             <p>{item.bookname}</p>
                        //         </Col>
                        //         <Col
                        //             xs={24}
                        //             sm={24}
                        //             md={8}
                        //             lg={6}
                        //             xl={6}
                        //         >
                        //             <p>{item.writer}</p>
                        //         </Col>
                        //         <Col
                        //             xs={24}
                        //             sm={24}
                        //             md={8}
                        //             lg={6}
                        //             xl={6}
                        //         >
                        //             <Button htmlType='submit' type='primary' 
                        //             onClick={() => {
                        //                 handlePdfGenerator();
                        //             }}>Details</Button>
                        //         </Col>
                        //     </> 
                        // )
                      )
                    }
                </Row>
            </Layout>
            <FooterCom />
        </>
    )
}

export default Home



