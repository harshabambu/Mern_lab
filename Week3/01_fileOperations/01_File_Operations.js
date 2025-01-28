const fs=require('fs')

function readFile(){
    fs.readFile('sample.txt','utf-8',(err,data)=>{
        if(err) throw err;
        console.log(data);
    })
}
readFile();


function writeFile(){

    fs.writeFile('sample.txt','hello world',(err)=>{
        if(err) throw err;
        console.log('File written successfully');
    })
}

writeFile();

function appendFile(){
    fs.appendFile('sample.txt','this is appened file',(err)=>{
        if(err) throw err;
        console.log('File appended successfully');
    })
}

appendFile();

function deleteFile(){
    fs.unlink('sample.txt',(err)=>{
        if(err) throw err;
        console.log('File deleted successfully');
    })
}

deleteFile();