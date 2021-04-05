const mailTemplate = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setthi reset password</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Quicksand', sans-serif;
      }
      .wrapper{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #FFF9EE;
      }
      .box{
        background-color: white;
        height: fit-content;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
      }
      .mt-10{
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="box">
        <img src="https://i.ibb.co/dfhgmk2/Banker-Monochromatic-2.png" alt="setthi-logo" border="0" style="height: 160px">
        <h1 class="mt-10">Setthi reset password</h1>
        <h4 class="mt-10">This is your recovery key</h4>
        <h1 style="letter-spacing: 5px; font-size: 4rem;" class="mt-10">123456</h1>
        <p class="mt-10" style="text-align: center;">Please enter this recovery key in the application to reset your password</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = mailTemplate;
