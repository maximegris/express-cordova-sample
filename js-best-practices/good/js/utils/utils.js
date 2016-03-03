(function(utils, undefined) {
  "use strict";

  /**
  * Représente les opérations sur les élements HTML.
  *
  * @constructor
  */
  utils.HTMLElement = function() {

  };

  /**
  * Retourne l'indicateur de présence de la classe CSS.
  *
  * @param {Object} el - L'élement HTML
  * @param {string} className - Le nom de la classe à rechercher
  * @return {Point} true si trouvé, false sinon
  */
  utils.HTMLElement.prototype.hasClass = function(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  };

  /**
  * Ajoute une classe CSS à un élement HTML.
  *     
  * @param {Object} el - L'élement HTML
  * @param {string} className - Le nom de la classe à ajouter
  */
  utils.HTMLElement.prototype.addClass = function(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!this.hasClass(el, className)) {
      el.className += " " + className;
    }
  };

  /**
  * Supprime une classe CSS à un élement HTML.
  *     
  * @param {Object} el - L'élement HTML
  * @param {string} className - Le nom de la classe à supprimer
  */
  utils.HTMLElement.prototype.removeClass = function(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (this.hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  };

  /**
  * Supprime une classe CSS à un élement HTML.
  *     
  * @param {string} id - L'identifiant de l'élement HTML
  * @param {string} event - Le nom de l'lévènement
  * @param {Function} fn - La fonction à appliquer sur l'évènement
  */
  utils.HTMLElement.prototype.addEvent = function(id, event, fn) {
    document.getElementById(id).addEventListener(event, fn);
  };

}(window.utils = window.utils || {}));