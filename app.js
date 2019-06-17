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
  if (this.length < 2) {
    return this;
  } else {
    let _this = [...this],
      size = _this.length,
      last_i = size - 1;

    for (let index_i = 0; index_i < size; index_i++) {
      for (let index_j = 0; index_j < size; index_j++) {
        let outItem = _this[index_i],
          inItem = _this[index_j];

        let areBothArrays = Array.isArray(outItem) && Array.isArray(inItem);
        let areBothDicts =
          outItem &&
          typeof outItem === 'object' &&
          outItem.constructor === Object &&
          inItem &&
          typeof inItem === 'object' &&
          inItem.constructor === Object;

        let areEqual =
          outItem === inItem ||
          ((areBothArrays || areBothDicts) && inItem.equals(outItem));

        if (index_i !== index_j && areEqual) {
          if (index_j === last_i) {
            return _this.slice(0, index_j).removeRepeated();
          } else {
            return _this
              .slice(0, index_j)
              .concat(_this.slice(index_j + 1))
              .removeRepeated();
          }
        }
      }
    }

    return _this;
  }
};

function main() {
  filesystem.readFile('parsed-custom.css', 'utf8', refactorCSS);

  /*
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
  */
  // console.log(parsedRules.stylesheet.rules);
}

function refactorCSS(error, data) {
  // console.log(data);
  const newRules = [];
  const mediaQueries = [];
  const ruleTree = {};
  const secret = '53P876q-r';

  let counter = 0,
    ruleId,
    ruleDeclarations,
    existingRule,
    existingDeclarations;

  const parsed = css.parse(data);
  const output = parsed;
  const rules = parsed.stylesheet.rules;

  for (const query of mediaQueries) {
    const queryId = crypto
      .createHmac('sha256', secret)
      .update(query.media)
      .digest('hex');

    // console.log(query);

    if (ruleTree[queryId]) {
      ruleTree[queryId].rules = mergeSets(ruleTree[queryId].rules, query.rules);
    } else {
      ruleTree[queryId] = query;
    }
  }

  for (const id in ruleTree) {
    if (ruleTree[id].type) newRules.push(ruleTree[id]);
    if (ruleTree[id].type == 'media') console.log('media queries');
  }

  output.stylesheet.rules = collapseRuleset(rules);

  filesystem.writeFile('parsed-custom.css', css.stringify(output), err => {
    if (err) console.log(err);
    else console.log('Successfully Written to File.');
  });
}

function collapseRuleset(rules) {
  const secret = '53P876q-r';

  let id, declarations, old_rule, old_declarations;
  let hashSet = {};
  let collapsedRuleset = [];

  for (const rule of rules) {
    if (rule.type == 'rule') {
      id = crypto
        .createHmac('sha256', secret)
        .update(rule.selectors.join(', '))
        .digest('hex');

      declarations = rule.declarations;

      if (hashSet[id]) {
        old_rule = hashSet[id];
        old_declarations = old_rule.declarations;

        // console.log(JSON.stringify(existingDeclarations));

        if (Array.isArray(old_declarations)) {
          old_declarations = mergeSets(declarations, old_declarations);
        } else {
          old_declarations = declarations;
        }

        hashSet[id].declarations = old_declarations;
      } else {
        hashSet[id] = rule;
      }
    } else if (rule.type == 'media') {
      id = crypto
        .createHmac('sha256', secret)
        .update(rule.media)
        .digest('hex');

      if (hashSet[id]) {
        hashSet[id].rules = collapseRuleset(
          mergeSets(hashSet[id].rules, rule.rules)
        );
      } else {
        hashSet[id] = rule;
      }
    }
  }

  for (const id in hashSet) {
    if (hashSet[id].type) collapsedRuleset.push(hashSet[id]);
  }

  return collapsedRuleset;
}

function mergeSets(existing_set, new_set) {
  let base_set = [...existing_set],
    extension_set = [...new_set];

  base_set = base_set.removeRepeated();
  extension_set = extension_set.removeRepeated();

  if (base_set.equals(extension_set, true)) {
    return existing_set;
  }

  let final_set = base_set.concat(extension_set).removeRepeated();

  return final_set;
}

main();

module.exports = {
  Array,
  Object,
  mergeSets,
};
