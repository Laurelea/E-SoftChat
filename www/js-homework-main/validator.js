class Validator {
  constructor() {
    this._errors = [];
    this._flag = true;
  }

  get Errors() {
    return this._errors;
  }

  /**
   *
   * @param schema
   * @param dataToValidate
   * @returns {boolean}
   */
  numberFunction (schema = {}, dataToValidate) {
    for (var key in schema) { //обращаемся к индексам
      switch (key) {
        case "minimum" :
          if (dataToValidate < schema["minimum"]) {
            this.Errors.push('Value is less than it can be');
            this._flag = false;
          }
          break
        case "maximum" :
          if (dataToValidate > schema["maximum"]) {
            this.Errors.push('Value is greater than it can be');
            this._flag = false;
          }
          break
        case "enum" :
          if (!(schema["enum"].includes(dataToValidate))) {
            this.Errors.push('The enum does not support value');
            this._flag = false;
          }
          break
      }
    }
    return this._flag;
  }
  stringFunction (schema = {}, dataToValidate) {
    for (var key in schema) { //обращаемся к индексам
      switch (key) {
        case "minLength" :
          if (dataToValidate.length < schema["minLength"]) {
            this.Errors.push('Too short string');
            this._flag = false;
          }
          break
        case "maxLength" :
          if (dataToValidate.length > schema["maxLength"]) {
            this.Errors.push('Too long string');
            this._flag = false;
          }
          break
		case "pattern" :
			//document.write("Regular!<br>");
          if (dataToValidate.match(schema["pattern"]) == null) {
            this.Errors.push('String does not match pattern');
            this._flag = false;
          }
          break
        case "enum" :
          if (!(schema["enum"].includes(dataToValidate))) {
            this.Errors.push('The enum does not support value');
            this._flag = false;
          }
          break
        case "format" :
          if (((schema["format"] == "email") && (dataToValidate.match(/^[^\s@]+@[^\s@]+$/) == null)) ||
              ((schema["format"] == "date") && (dataToValidate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) == null))) {
              this.Errors.push('Format of string is not valid');
              this._flag = false;
          }
          break
      }

    }
    return this._flag;

  }
  objectFunction (schema = {}, dataToValidate) {
    for (var key in schema) { //обращаемся к индексам
      switch (key) {
        case "minProperties" :
          if (Object.keys(dataToValidate).length < schema["minProperties"]) {
            this.Errors.push('Too few properties in object');
            this._flag = false;
          }
          break
        case "maxProperties" :
          if (Object.keys(dataToValidate).length > schema["maxProperties"]) {
            this.Errors.push('Too many properties in object');
            this._flag = false;
          }
          break
        case "required" :
          for (var i in schema["required"]) {
            // document.write("Curr elem: " + i + "<br>")
            if (!(Object.keys(dataToValidate).includes(schema["required"][i]))) {
              this.Errors.push('Property required, but value is undefined');
              this._flag = false;
            }
          }
          break
        case "properties" :
          for (var elem in schema["properties"]) {
            const addIsValid = this.isValid(schema["properties"][elem], dataToValidate[elem]);
          }
          break
        case "additionalProperties" :
          if (schema["additionalProperties"] == false) {
              const poolKeys = Object.keys(schema["properties"]);
              const dataKeys = Object.keys(dataToValidate);
              const diff = dataKeys.filter(x => !poolKeys.includes(x));
              if (diff.length > 0) {
                this.Errors.push('An object cant have additional properties');
                this._flag = false;
              }
          }
          break
      }

    }
    return this._flag;

  }
  arrayFunction (schema = {}, dataToValidate) {
    for (var key in schema) { //обращаемся к индексам
      switch (key) {
        case "minItems" :
            if (dataToValidate.length < schema["minItems"]) {
              this.Errors.push('Items count less than can be');
              this._flag = false;
            }
            break
        case "maxItems" :
            if (dataToValidate.length > schema["maxItems"]) {
              this.Errors.push('Items count more than can be');
              this._flag = false;
            }
          break
        case "items" :
          if (Object.keys(schema['items']).length > 1)
          {
            const posItemTypes = []
            for (var elem in schema["items"]) {
              posItemTypes.push(schema["items"][elem]["type"]);
            }
              for (var elem in dataToValidate) {
                if (!(posItemTypes.includes(typeof dataToValidate[elem]))) {
                  this.Errors.push('Type is incorrect');
                }
              }
          } else {
              for (var elem in dataToValidate) {
                if ((typeof dataToValidate[elem]) != schema["items"]["type"]) {
                  this.Errors.push('Type is incorrect');
                  this._flag = false;
                }
              }
          }
          break
        case "enum" :
          const dataJSONVar = JSON.stringify(dataToValidate);
          const checkResults = []
          for (const i in schema["enum"]) {
              const enumJSONvar = JSON.stringify(schema["enum"][i])
              checkResults.push(dataJSONVar == enumJSONvar);
          }
          if (!(checkResults.some(x => x== true))) {
              this.Errors.push('The enum does not support one of array elements');
              this._flag = false;
          }
          break
        case "contains" :
          if (!(dataToValidate.includes(schema["contains"]))) {
            this.Errors.push('Must contain a value, but does not');
            this._flag = false;
          }
          break
        case "uniqueItems" :
          const tryJSON = dataToValidate.map((object) => JSON.stringify(object));
          const uSet = new Set(tryJSON);
          const uniqueElems = Array.from(uSet);
          const uObjByCont = uniqueElems.map((string) => JSON.parse(string));

          if (uniqueElems.length< dataToValidate.length) {
            this.Errors.push('Elements of array not unique');
            this._flag = false;
          }
          break                }

    }
    return this._flag;

  }
  isValid(schema = {}, dataToValidate) {
    for (var key in schema) {
      switch (key) {
        case "type":
          //Проверяем на ноль:
          if ((schema["nullable"] == false) && (dataToValidate === null)) {
            this.Errors.push('Value is null, but nullable false')
            this._flag = false;
          }

          //Проверяем, есть ли такой тип в списке:
          const possTypes = ['number', 'string', 'boolean', 'object', 'array'];
          if (!(possTypes.includes(schema["type"]))) {
            this.Errors.push("Unknown type")
            this._flag = false;
          }

          //Проверяем, соответствуют ли данные указанному типу (если они не null):
          const checkTypeOfData = Array.isArray(dataToValidate) ? "array": typeof (dataToValidate)
          if (!(checkTypeOfData == schema['type']) && !(schema["nullable"])) {
            this.Errors.push("Type is incorrect");
            this._flag = false;
          }
          //Начинаем проверят по типам данных:

          switch (schema["type"]) {
            case "number" :
              // document.write("It's a number! ->" + schema["type"]+"<br>");
              this.numberFunction(schema, dataToValidate);
              // document.write("NumberFunction result: "+ this.numberFunction(schema, dataToValidate)+"<br>");
              break
            case "string" :
              // document.write("It's a string! ->" +schema["type"]+ "<br>");
              this.stringFunction(schema, dataToValidate)
              // document.write("StringFunction result: "+ this.stringFunction(schema, dataToValidate)+"<br>");
              break
            case "object":
              // document.write("It's an object! ->" +schema["type"]+ "<br>");
              this.objectFunction(schema, dataToValidate)
              // document.write("ObjectFunction result: "+ this.objectFunction(schema, dataToValidate)+"<br>");
              break
            case "array":
              // document.write("It's an array! ->" +schema["type"]+ "<br>");
              this.arrayFunction(schema, dataToValidate)
              // document.write("ArrayFunction result: "+ this.arrayFunction(schema, dataToValidate)+"<br>");
              break
          }
          break

        case "anyOf":
          const anyArray = [];
          for (var i in schema["anyOf"]) {
            this._flag = true;
            anyArray.push(this.isValid(schema["anyOf"][i], dataToValidate));
          }
          if (anyArray.every(x => x == false)) {
            this.Errors.unshift('None schemas are valid');
            this._flag = false;
          }
          break

        case "oneOf":
          const oneArray = [];
          for ( var i in schema["oneOf"]) {
            console.log(schema["oneOf"][i]);
            this._flag = true;
            oneArray.push(this.isValid(schema["oneOf"][i], dataToValidate));
            console.log("oneArray: " + oneArray);
          }
          if (oneArray.every(x => x == false)) {
            console.log("All false here")
            this.Errors.unshift('None schemas are valid');
            this._flag = false;
            console.log("Flag changed")
          } else if (oneArray.filter(x => x == true).length > 1) {
            // const myVar = oneArray.filter(x => x == true).length
            this.Errors.unshift('More than one shema valid for this data');
            this._flag = false;
          }
          break

      }
    }
    return this._flag;
  }
  }
