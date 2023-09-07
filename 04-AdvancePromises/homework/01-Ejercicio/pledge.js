"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor debe ser una function");

    this._state = "pending";
    this._value = undefined;

    executor(
      (value) => {
        this._internalResolve(value);
      },
      (reason) => {
        this._internalReject(reason);
      }
    );
  }
}

$Promise.prototype._internalResolve = function (response) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = response;
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = reason;
  }
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
