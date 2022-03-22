import DefaultSchema from './default.json';
import MysqlSchema from './Mysql.json';
import OracleSchema from './Oracle.json';
import Test_Mysql from './Test_Mysql.json';
import Test_Oracle from './Test_Oracle.json';

const handleSchema = (config: any) => {
  const newConfig = Object.assign({}, DefaultSchema, {properties: {...DefaultSchema.properties, ...config.properties}});
  return newConfig;
}

const Test_MysqlSchema = handleSchema(Test_Mysql);
const Test_OracleSchema = handleSchema(Test_Oracle);

export { 
  DefaultSchema, 
  MysqlSchema,
  OracleSchema,
  Test_MysqlSchema,
  Test_OracleSchema
};