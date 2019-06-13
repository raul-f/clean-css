const css = require('css');
const filesystem = require('fs');
const crypto = require('crypto');

Object.prototype.equals = function(
  object,
  ignoreProps = ['position']
  /* ignoreProps = null */
) {
  const isObject =
    object && typeof object === 'object' && object.constructor === Object;

  if (!isObject) return false;

  if (ignoreProps === null) {
    for (let property in this) {
      const areBothArrays =
        Array.isArray(this[property]) && Array.isArray(object[property]);
      const areBothDicts =
        this[property] &&
        typeof this[property] === 'object' &&
        this[property].constructor === Object &&
        object[property] &&
        typeof object[property] == 'object' &&
        object[property].constructor === Object;

      if (areBothArrays || areBothDicts) {
        if (!this[property].equals(object[property])) return false;
      } else if (
        object[property] === undefined ||
        this[property] !== object[property]
      ) {
        return false;
      }
    }
  } else {
    for (property in this) {
      const areBothArrays =
        Array.isArray(this[property]) && Array.isArray(object[property]);
      const areBothDicts =
        this[property] &&
        typeof this[property] === 'object' &&
        this[property].constructor === Object &&
        object[property] &&
        typeof object[property] == 'object' &&
        object[property].constructor === Object;

      if (ignoreProps.includes(property)) {
        continue;
      } else if (areBothArrays || areBothDicts) {
        if (!this[property].equals(object[property])) return false;
      } else if (
        object[property === undefined] ||
        this[property] !== object[property]
      ) {
        return false;
      }
    }
  }

  return true;
};

Array.prototype.equals = function(array, ignoreOrder = false) {
  if (!Array.isArray(array)) return false;
  if (this === array) return true;
  if (this.length != array.length) return false;

  if (ignoreOrder) {
    for (let i = 0; i < this.length; i++) {
      let control = false;

      for (let j = 0; j < array.length; j++) {
        let areBothArrays = Array.isArray(this[i]) && Array.isArray(array[j]);
        let areBothDicts =
          this[i] &&
          typeof this[i] === 'object' &&
          this[i].constructor === Object &&
          array[j] &&
          typeof array[j] === 'object' &&
          array[j].constructor === Object;

        if (areBothArrays || areBothDicts) {
          if (array[j].equals(this[i])) control = true;
        } else if (this[i] === array[j]) {
          // console.log('passing');
          control = true;
        }
      }

      if (!control) return false;
    }

    for (let j = 0; j < array.length; j++) {
      let control = false;

      for (let i = 0; i < this.length; i++) {
        let areBothArrays = Array.isArray(array[j]) && Array.isArray(this[i]);
        let areBothDicts =
          array[j] &&
          typeof array[j] === 'object' &&
          array[j].constructor === Object &&
          this[i] &&
          typeof this[i] === 'object' &&
          this[i].constructor === Object;

        if (areBothArrays || areBothDicts) {
          if (this[i].equals(array[j])) control = true;
        } else if (this[i] === array[j]) {
          control = true;
        }
      }

      if (!control) return false;
    }
  } else {
    // ignoreOrder === false
    for (let i = 0; i < this.length; i++) {
      let areBothArrays = Array.isArray(this[i]) && Array.isArray(array[i]);
      let areBothDicts =
        this[i] &&
        typeof this[i] === 'object' &&
        this[i].constructor === Object &&
        array[i] &&
        typeof array[i] === 'object' &&
        array[i].constructor === Object;

      if (areBothArrays || areBothDicts) {
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] !== array[i]) return false;
    }
  }

  return true;
};

function main() {
  filesystem.readFile('custom.css', 'utf8', refactorCSS);
}

function refactorCSS(error, data) {
  // console.log(data);
  const newRules = [];
  const mediaQueries = [];
  const stateTree = {};
  const secret = '53P876q-r';

  let counter = 0,
    ruleId,
    ruleDeclarations,
    existingRule,
    existingDeclarations;

  const parsed = css.parse(data);
  const output = parsed;
  const rules = parsed.stylesheet.rules;

  for (const rule of rules) {
    if (/* counter < 200 && counter >= 180 &&*/ rule.type == 'rule') {
      ruleId = crypto
        .createHmac('sha256', secret)
        .update(rule.selectors.join())
        .digest('hex');

      ruleDeclarations = rule.declarations;

      if (stateTree[ruleId]) {
        existingRule = stateTree[ruleId];
        existingDeclarations = existingRule.declarations;

        console.log(JSON.stringify(existingDeclarations));

        existingDeclarations = mergeDeclarations(
          ruleDeclarations,
          existingDeclarations
        );
      } else {
        stateTree[ruleId] = rule;
      }
    } else if (rule.type == 'media') {
      mediaQueries.push(rule);
    }

    counter++;
  }
  // console.log(stateTree);
}

function mergeDeclarations(existing_declarations, new_declarations) {
  if (existing_declarations.equals(new_declarations, true)) {
    return existing_declarations;
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (const existingDeclaration of existing_declarations) {
    let diffCounter = 0;

    for (const declaration of new_declarations) {
    }

    if (!new_declarations.includes(existingDeclaration)) return false;
  }
  return true;
}

/*
console.log(
  css.parse(`
    header {
      background-color: #fff;
      border-bottom: 1px solid #E6E6E6;
    }
    header .header-desk {
      display: none;
    }
    @media (min-width: 992px) {
      header .header-desk {
        display: block;
      }
      header .header-mobile {
        display: none;
      }
    }

    header {
    background-color: #fff;
    border-bottom: 1px solid #E6E6E6;
    }
    header .header-desk {
      display: none;
    }
    @media (min-width: 992px) {
      header .header-desk {
        display: block;
      }
      header .header-mobile {
        display: none;
      }
    }
  `).stylesheet
);
*/

// main();

console.log(
  {
    type: 'declaration',
    property: 'display',
    value: 'none',
    position: {
      start: { line: 4457, column: 3 },
      end: { line: 4457, column: 16 },
    },
  }.equals({
    type: 'declaration',
    property: 'display',
    value: 'none',
    position: {
      start: { line: 4457, column: 3 },
      end: { line: 4457, column: 16 },
    },
  })
);
