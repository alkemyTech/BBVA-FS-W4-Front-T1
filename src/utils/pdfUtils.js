import jsPDF from "jspdf";
import "jspdf-autotable";

const logoPath = "https://i.ibb.co/pQnLqjn/LOGO-SIN-FONDO-letras-blancas-POSTA.png"; // Ruta de la imagen del logo

export const generateReceipt = async (type, data, account) => {
  console.log(account)
  if (data.type === "INCOME") {
    type = "Ingreso"
  } else if (data.type === "PAYMENT"){
    type = "Pago"
  } else {
    type = "Depósito"
  }
  const doc = new jsPDF({
    compress: true,
    orientation: "portrait",
    unit: "mm",
    format: "a4", // Formato del documento A4
  });

  // Cargar imagen de manera asíncrona
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  const handleAccountType = (accountType) => {
    if (accountType == "CAJA_AHORRO") {
      return "Caja de ahorro"
    } else {
      return "Cuenta corriente"
    }
  }

  try {
    // Cargar el logo
    const logo = await loadImage(logoPath);

    // Fondo del documento
    doc.setFillColor(241, 246, 245); // Color de fondo #F1F6F5
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");

    // Encabezado
    const headerHeight = 20; // Altura del encabezado
    doc.setFillColor(71, 33, 131);
    doc.rect(0, 0, doc.internal.pageSize.width, headerHeight, "F");

    // Agregar el logo al encabezado
    const logoWidth = 55;
    const logoHeight = 15;
    const logoX = (doc.internal.pageSize.width - logoWidth) / 2;
    const logoY = (headerHeight - logoHeight) / 2;

    doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Información de la transferencia
    const cardX = 20; // Coordenada X del card
    const cardY = headerHeight + 20; // Coordenada Y del card
    const cardWidth = doc.internal.pageSize.width - 40; // Ancho del card
    const cardHeight = 160; // Altura del card
    const borderRadius = 10; // Radio del borde redondeado

    // Dibuja el contorno del card con bordes redondeados
    doc.setDrawColor(128, 128, 128); // Color de las líneas gris medio
    doc.setLineWidth(0.5);
    doc.roundedRect(cardX, cardY, cardWidth, cardHeight, borderRadius, borderRadius);

    // Título principal
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Comprobante de ${type}`, cardX + cardWidth / 2, cardY + 20, { align: "center" });

    // Subtítulo
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Número ${data.idTransaction}`, cardX + cardWidth / 2, cardY + 30, { align: "center" });

    const startY = cardY + 50;
    const info = [
      { label: "Estado de la transferencia", value: "Aprobada" },
      { label: "Número de comprobante", value: String(data.idTransaction) },
      { label: "Fecha y hora", value: `${data.transactionDate[2]}/${data.transactionDate[1]}/${data.transactionDate[0]} ${data.transactionDate[3]}:${data.transactionDate[4]}` },
      { label: "Cuenta Débito Nº", value: account.cbu },
      { label: "Alias", value: account.alias },
      { label: "Importe Debitado", value: `$ ${data.amount}` },
      { label: "Moneda Cuenta", value: data.accountCurrency },
      { label: "Concepto", value: data.concept },
      { label: "Descripción", value: data.description },
      { label: "Tipo de cuenta", value: handleAccountType(account.accountType) }
    ];

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    info.forEach((item, index) => {
      const posY = startY + (index * 10);
      doc.setFont("helvetica", "bold"); // Poner el título en negrita
      doc.text(`${item.label}:`, cardX + 10, posY);
      doc.setFont("helvetica", "normal"); // Volver a la fuente normal para el valor
      doc.text(String(item.value), cardX + 80, posY); // Asegurarse de que el valor sea una cadena
      // doc.setDrawColor(220, 220, 220); // Color de las líneas claras
      // doc.line(cardX + 10, posY + 2, cardX + cardWidth - 10, posY + 2); // Línea clara debajo de cada dato
    });

    // Pie de página
    doc.setFillColor(71, 33, 131);
    doc.rect(0, doc.internal.pageSize.height - 20, doc.internal.pageSize.width, 20, "F");

    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Generado por Magic Dogs", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });

    // Guardar y descargar el PDF
    doc.save(`receipt_${type}_${new Date().getTime()}.pdf`);
  } catch (error) {
    console.error("Error loading logo:", error);
  }
};
