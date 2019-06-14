const css = require('css');
const filesystem = require('fs');
const crypto = require('crypto');

// Fully functional

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

// Semi-functional; if order is ignored, it does not account for item quantities

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

// Fully functional

Array.prototype.removeRepeated = function() {
  let _this = [...this],
    rest;

  for (
    let outerCounter = 0, outerIndex = 0;
    outerCounter < this.length;
    outerCounter++, outerIndex++
  ) {
    rest = _this.slice(0, outerIndex).concat(_this.slice(outerIndex + 1));

    let isArray = Array.isArray(_this[outerIndex]);
    let isDict =
      _this[outerIndex] &&
      typeof _this[outerIndex] === 'object' &&
      _this[outerIndex].constructor === Object;

    for (let innerIndex = 0; innerIndex < rest.length; innerIndex++) {
      let areBothArrays = isArray && Array.isArray(rest[innerIndex]);
      let areBothDicts =
        isDict &&
        rest[innerIndex] &&
        typeof rest[innerIndex] === 'object' &&
        rest[innerIndex].constructor === Object;

      let cutHeight;

      if (innerIndex === outerIndex) {
        cutHeight = outerIndex;
      } else {
        cutHeight = innerIndex + 1;
      }

      if (areBothArrays || areBothDicts) {
        if (_this[outerIndex].equals(rest[innerIndex])) {
          _this = _this.slice(0, cutHeight).concat(_this.slice(cutHeight + 1));
          // outerCounter++;
          outerIndex--;
          break;
        }
      } else if (_this[outerIndex] === rest[innerIndex]) {
        _this = _this.slice(0, cutHeight).concat(_this.slice(cutHeight + 1));
        // outerCounter++;
        outerIndex--;
        break;
      }
    }
  }

  return _this;
};

function main() {
  // filesystem.readFile('custom.css', 'utf8', refactorCSS);

  const parsedRules = css.parse(`
    header {
      color: #282828;
      font-size: 11px;
    }

    header {
      background: url('../img/phone-header.png') no-repeat left center;
      font-family: 'Muli', sans-serif;
      height: 15px;
      display: inline-block;
    }
    
    header {
      background: url('../img/whats-header.png') no-repeat left center;
      font-family: 'Muli', sans-serif;
      height: 15px;
      display: inline-block;
    }

    header {
      color: #636363;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 700;
      height: 20px;
      width: 100%;
    }

    header  {
      background: url('../img/login-header.png') no-repeat left center;
      height: 20px;
    }

    header  {
      color: #E33736;
    }

    header {
      text-align: right;
      font-family: 'Muli', sans-serif;
    }

    header {
      margin-left: 36px;
      padding-left: 36px;
      border-left: 1px solid #282828;
    }

    header  {
      margin: 20px auto;
    }

    header  {
      display: none;
    }

    header  {
      color: #282828;
      font-size: 11px;
    }

    header {
      background: url('../img/phone-header.png') no-repeat left center;
      font-family: 'Muli', sans-serif;
      height: 15px;
      display: inline-block;
    }

    header {
      background: url('../img/whats-header.png') no-repeat left center;
      font-family: 'Muli', sans-serif;
      height: 15px;
      display: inline-block;
    }

    header{
      color: #636363;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 700;
      height: 20px;
      width: 100%;
    }

    header{
      background: url('../img/login-header.png') no-repeat left center;
      height: 20px;
    }

    header {
      color: #E33736;
    }

    header {
      text-align: right;
      font-family: 'Muli', sans-serif;
    }

    header {
      margin-left: 36px;
      padding-left: 36px;
      border-left: 1px solid #282828;
    }

    header {
      margin: 20px auto;
    }

    header {
      display: none;
    }
  `);

  // console.log(parsedRules.stylesheet.rules);

  let headRule = parsedRules.stylesheet.rules[0];
  let headDecs = headRule.declarations;

  for (let rule of parsedRules.stylesheet.rules) {
    headDecs = mergeDeclarations(headDecs, rule.declarations);
  }

  console.log(headDecs);
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
  let prev_decs = [...existing_declarations],
    new_decs = [...new_declarations];

  prev_decs = prev_decs.removeRepeated();
  new_decs = new_decs.removeRepeated();

  if (prev_decs.equals(new_decs, true)) {
    return existing_declarations;
  }

  let combined_decs = prev_decs.concat(new_decs).removeRepeated();

  return combined_decs;
}

main();
