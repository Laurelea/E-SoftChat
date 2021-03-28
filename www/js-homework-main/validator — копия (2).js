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
    // document.write("Data to validate: "+dataToValidate+"<br>");
    // var possNumVals = ["minimum", "maximum", "enum"]
    for (var key in schema) { //обращаемся к индексам
      // document.write("Current schema is: " + key + " " + schema[key] + "<br>")
      // document.write(+ schema +"<br>");
      switch (key) {
        case "minimum" :
          if (dataToValidate < schema["minimum"]) this.Errors.push('Value is less than it can be');
          break
        case "maximum" :
          if (dataToValidate > schema["maximum"]) this.Errors.push('Value is greater than it can be');
          break
        case "enum" :
          if (!(schema["enum"].includes(dataToValidate))) this.Errors.push('The enum does not support value');
          break
      }
    }
    // numberFunction.bind(this)();
    // console.log(this._errors);
    return (this._errors.length == 0) ? true : false;
  }
  stringFunction (schema = {}, dataToValidate) {
    // document.write("Data to validate: "+dataToValidate+"<br>");
    for (var key in schema) { //обращаемся к индексам
      // document.write("Current schema is: " + key + " " + schema[key] + "<br>")
      // document.write(+ schema +"<br>");
      switch (key) {
        case "minLength" :
          if (dataToValidate.length < schema["minLength"]) this.Errors.push('Too short string');
          break
        case "maxLength" :
          if (dataToValidate.length > schema["maxLength"]) this.Errors.push('Too long string');
          break
		case "pattern" :
			//document.write("Regular!<br>");
          if (dataToValidate.match(schema["pattern"]) == null) this.Errors.push('String does not match pattern');
          break
        case "enum" :
          if (!(schema["enum"].includes(dataToValidate))) this.Errors.push('The enum does not support value');
          break
        case "format" :
          if (((schema["format"] == "email") && (dataToValidate.match(/^[^\s@]+@[^\s@]+$/) == null)) ||
              ((schema["format"] == "date") && (dataToValidate.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/) == null))) {
              this.Errors.push('Format of string is not valid');
          }
          break
      }

    }
    return (this.Errors.length == 0) ? true : false;

  }
  objectFunction (schema = {}, dataToValidate) {
    for (var key in schema) { //обращаемся к индексам
      switch (key) {
        case "minProperties" :
          if (Object.keys(dataToValidate).length < schema["minProperties"]) this.Errors.push('Too few properties in object');
          break
        case "maxProperties" :
          if (Object.keys(dataToValidate).length > schema["maxProperties"]) this.Errors.push('Too many properties in object');
          break
        case "required" :
          // if (Object.keys(dataToValidate).includes(schema["required"]) == false) this.Errors.push('Property required, but value is undefined');
          // break
          for (var i in schema["required"]) {
            // document.write("Curr elem: " + i + "<br>")
            if (!(Object.keys(dataToValidate).includes(schema["required"][i]))) this.Errors.push('Property required, but value is undefined');
          }
          break
        case "properties" :
          for (var elem in schema["properties"]) {
            // const propValidator = new Validator();
            //дописать после arrays:
            const addIsValid = this.isValid(schema["properties"][elem], dataToValidate[elem]);
          }
          break
        case "additionalProperties" :
          if (schema["additionalProperties"] == false) {
              const poolKeys = Object.keys(schema["properties"]);
              const dataKeys = Object.keys(dataToValidate);
              const diff = dataKeys.filter(x => !poolKeys.includes(x));
              //console.log(diff);
              if (diff.length > 0) this.Errors.push('An object cant have additional properties');
          }
          break
      }

    }
    return (this.Errors.length == 0) ? true : false;

  }
  arrayFunction (schema = {}, dataToValidate) {
    // document.write("Data to validate: "+dataToValidate+"<br>");
    for (var key in schema) { //обращаемся к индексам
      // document.write("Current schema is: " + key + " " + schema[key] + "<br>")
      // document.write(+ schema +"<br>");
      switch (key) {
        case "minItems" :
            if (dataToValidate.length < schema["minItems"]) this.Errors.push('Items count less than can be');
            break
        case "maxItems" :
            if (dataToValidate.length > schema["maxItems"]) this.Errors.push('Items count more than can be');
          break
        case "items" :
          // document.write("Items!<br>");
          // const mya = Object.keys(schema['items']);
          // console.log(mya, " ", mya.length);
          if (Object.keys(schema['items']).length > 1)
          {
            const posItemTypes = []
            for (var elem in schema["items"]) {
              // document.write("Element: " + elem + "<br>");
              // document.write("Contents: " + schema["items"].elem + "<br>");
              posItemTypes.push(schema["items"][elem]["type"]);
              // console.log("Type: " + posItemTypes);
            }
            // try {
              for (var elem in dataToValidate) {
                if (!(posItemTypes.includes(typeof dataToValidate[elem]))) {
                  this.Errors.push('Type is incorrect');
                  // throw new TypeError('Type is incorrect');
                }
              }
            // } catch (myError) {
              // console.log(myError);
              // this.Errors.push(myError);
            // }
          } else {
            // try {
              for (var elem in dataToValidate) {
                if ((typeof dataToValidate[elem]) != schema["items"]["type"]) {
                  // throw new TypeError('Type is incorrect');
                  this.Errors.push('Type is incorrect');

                }
              }
            // } catch (myError) {
            //   // console.log(myError);
            //   this.Errors.push(myError);
            // }
          }
          break
        case "enum" :
          if (!(dataToValidate.includes(schema["enum"]))) this.Errors.push('The enum does not support one of array elements');
          break
        case "contains" :
          if (!(dataToValidate.includes(schema["contains"]))) this.Errors.push('Must contain a value, but does not');
          break
        case "uniqueItems" :
          const tryJSON = dataToValidate.map((object) => JSON.stringify(object));
          const uSet = new Set(tryJSON);
          const uniqueElems = Array.from(uSet);
          const uObjByCont = uniqueElems.map((string) => JSON.parse(string));

          //console.log("uniqueElems: " + uniqueElems);
          //document.write("Length: " + uniqueElems.length + "<br>");
          if (uniqueElems.length< dataToValidate.length) this.Errors.push('Elements of array not unique');
          break                }

    }
    return (this.Errors.length == 0) ? true : false;

  }
  isValid(schema = {}, dataToValidate) {
    for (var key in schema) {
      switch (key) {
        //case "nullable":
          //Проверяем на ноль:
            // var isNull = (dataToValidate === null) ? true : false;
          //if ((schema["nullable"] == false) &&(dataToValidate === null)) this.Errors.push('Value is null, but nullable false')
          //break
        case "type":
		          //Проверяем на ноль:
          if ((schema["nullable"] == false) &&(dataToValidate === null)) this.Errors.push('Value is null, but nullable false')

          //Проверяем, есть ли такой тип в списке:
          const possTypes = ['number', 'string', 'boolean', 'object', 'array'];
          if (!(possTypes.includes(schema["type"]))) this.Errors.push("Unknown type");
          //Проверяем, соответствуют ли данные указанному типу (если они не null):
          const checkTypeOfData = Array.isArray(dataToValidate) ? "array": typeof (dataToValidate)
          if (!(checkTypeOfData == schema['type']) && !(schema["nullable"])) this.Errors.push("Type is incorrect");
          //Начинаем проверят по типам данных:
          // document.write("The type to check further: " +schema["type"]+ '<br>');

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
          const anyArray = []
          for (var elem in schema["anyOf"]) {
            anyArray.push(this.isValid(schema["anyOf"][elem], dataToValidate))
          }
          if (anyArray.every(x => false)) this.Errors.unshift('None schemas are valid');
          break
        case "oneOf":

      }
    }
    // console.log(this._errors);
    return (this.Errors.length == 0) ? true : false;
    // return this.Errors[0];
  }
  }
