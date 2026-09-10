const discountButton = document.getElementById("discountBtn");
const result = document.getElementById("result");


discountButton.addEventListener("click", () => {

  const precio = 1200;

  const descuento = precio * 0.10;

  const precioFinal = precio - descuento;

  result.textContent =
    `Precio con descuento: $${precioFinal}`;

});


async function loadSecurityStatus() {

  const vulnerabilityCount =
    document.getElementById("vulnerabilityCount");

  const criticalCount =
    document.getElementById("criticalCount");

  const highCount =
    document.getElementById("highCount");

  const moderateCount =
    document.getElementById("moderateCount");

  const lowCount =
    document.getElementById("lowCount");

  const statusIndicator =
    document.getElementById("statusIndicator");

  const packageList =
    document.getElementById("packageList");


  try {

    const response =
      await fetch("/api/security");

    const data =
      await response.json();


    vulnerabilityCount.textContent =
      data.total;

    criticalCount.textContent =
      data.critical;

    highCount.textContent =
      data.high;

    moderateCount.textContent =
      data.moderate;

    lowCount.textContent =
      data.low;


    packageList.innerHTML = "";


    if (data.total === 0) {

      statusIndicator.textContent =
        "✓ Sin vulnerabilidades conocidas";

      statusIndicator.classList.add(
        "status-safe"
      );

      packageList.innerHTML =
        "<p>No se detectaron dependencias vulnerables.</p>";

    }

    else {

      statusIndicator.textContent =
        "⚠ Riesgo detectado";

      statusIndicator.classList.add(
        "status-danger"
      );


      data.packages.forEach(pkg => {

        const element =
          document.createElement("div");

        element.className =
          "package-item";


        element.innerHTML = `
          <span class="package-name">
            ${pkg.name}
          </span>

          <span class="package-severity">
            ${pkg.severity}
          </span>
        `;


        packageList.appendChild(element);

      });

    }

  }

  catch (error) {

    console.error(error);

    statusIndicator.textContent =
      "Error al analizar";

  }

}


loadSecurityStatus();