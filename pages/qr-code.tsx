import QRCode from "react-qr-code";

export default function QRCodePage() {

  return (
    <div>
      <QRCode
        size={200}
        bgColor="white"
        fgColor="black"
        value="abc"
      />
    </div>
  );
}
