const { 
    override, 
    fixBabelImports, 
    addLessLoader,
    addDecoratorsLegacy
} = require('customize-cra')

const theme = require ('./lessVars.js')

module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true ,
    }),  
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: theme,
    }),
)