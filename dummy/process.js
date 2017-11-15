// const something = process.env
// console.log(something)

// process is produced from node, use to find out variables about the running CLI.

// env is about the environment duh
// console.log(process.env)

// process.argv is an array containing the command line arguments.
// The first element will be 'node', 
//  the second element will be the name of the JavaScript file.
// The next elements will be any additional command line arguments.
console.log(process.argv.slice(2))