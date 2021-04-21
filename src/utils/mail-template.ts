export const getMailTemplate = (token: string) => {
	return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Setthi reset password</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Quicksand", sans-serif;
      }
      .wrapper {
        width: 100%;
        display: table;
        background-color: #fff9ee;
        padding: 2rem;
      }
      td,
      th {
        border: none;
      }
      tr:nth-child(0) {
        margin-top: 2rem;
      }
      tr:nth-last-child(0) {
        margin-top: 2rem;
      }
      tbody,
      tr,
      td {
        width: 100%;
      }
      td {
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div>
      <table class="wrapper">
        <tr>
          <td>
            <img
              src="https://i.ibb.co/dfhgmk2/Banker-Monochromatic-2.png"
              alt="setthi-logo"
              border="0"
              style="width: 50%"
            />
          </td>
        </tr>
        <tr>
          <td>
            <h1 class="mt-10">Setthi reset password</h1>
          </td>
        </tr>
        <tr>
          <td>
            <h4 class="mt-10">This is your recovery key</h4>
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="letter-spacing: 5px; font-size: 4rem" class="mt-10">
              ${token}
            </h1>
          </td>
        </tr>
        <tr>
          <td>
            <p class="mt-10" style="text-align: center">
              Please enter this recovery key in the application to reset your
              password
            </p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
  `
}
