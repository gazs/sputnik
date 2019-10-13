const source = require('./fortepan.json')
const fortepanToSane= (obj) => {
  const { resultInfo, fields, data } = obj;
  return data.map(array => array.reduce((acc, value, i) => ({...acc, [fields[i]]: value}), {}));
}

export default fortepanToSane(source)
