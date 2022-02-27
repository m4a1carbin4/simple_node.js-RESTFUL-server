module.exports = function (app,fs)
{
    // LOAD USER_LIST
    app.get('/userlist',function(req,res){
        // LOAD JSON DATA
        fs.readFile(__dirname+'/data/'+'user.json','utf8',function (err, data){
            console.log(data);
            //SEND USER LIST
            res.end( data );
        });
    });

    // FIND USER_INFO
    app.get('/Find/:username', function(req, res){
        // LOAD JSON DATA
        fs.readFile( __dirname + "/data/user.json", 'utf8', function (err, data) {
            //PARSING JSON DATA
             var users = JSON.parse(data);
             //SEND USER DATA
             res.json(users[req.params.username]);
        });
    });

    // ADD USER
    app.post('/Add/:username', function(req, res){

        var result = {  };
        var username = req.params.username;

        //CHEK RQUEST BODY
        //console.log(req.body)

        // CHECK REQUEST DATA
        if(!req.body["GM"] || !req.body["name"] || !req.body["meme"]){
            // IF DATA ERROR -> SEND ERROR DATA
            result["Add_success"] = 0;
            result["Add_error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/data/user.json", 'utf8',  function(err, data){
            // PARSING JSON DATA
            var users = JSON.parse(data);

            if(users[username]){
                // DUPLICATION FOUND -> SEND ERROR DATA
                result["Add_success"] = 0;
                result["Add_errorr"] = "duplicate";
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;

            // SAVE JSON DATA
            fs.writeFile(__dirname + "/data/user.json",
                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                result = {"Add_success": 1};
                res.json(result);
            })
        })
    });
    
    //UPDATE USER
    app.put('/update/:username', function(req, res){

        var result = {  };
        var username = req.params.username;

        //CHEK RQUEST BODY
        //console.log(req.body)

        // CHECK REQ VALIDITY
        if(!req.body["GM"] || !req.body["name"] || !req.body["meme"]){
            // IF DATA ERROR -> SEND ERROR DATA
            result["Update_success"] = 0;
            result["Update_error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/data/user.json", 'utf8',  function(err, data){
            // PARSING JSON DATA
            var users = JSON.parse(data);
            
            if(users[username]){
                // USER FOUND
                // ADD TO Update_DATA
                users[username] = req.body;

                // SAVE DATA
                fs.writeFile(__dirname + "/data/user.json",
                            JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                    result = {"Update_success": 1};
                    res.json(result);
                })

                return;
            }
            // UESR NOT FOUND
            result["Update_success"] = 0;
            result["Update_error"] = "user_cannot_found";
            res.json(result);
        })
    });

    // DELETE USER
    app.delete('/delete/:username', function(req, res){

        var result = {  };
        var username = req.params.username;

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/data/user.json", 'utf8',  function(err, data){
            // PARSING JSON DATA
            var users = JSON.parse(data);
            
            if(! users[username]){
                //USER CANNOT FIND
                result["Delete_success"] = 0;
                result["Delete_error"] = "user_cannot_found";
                res.json(result);
                return;
            }

            // DUPLICATION FOUND
            // DEl DATA
            delete users[username];

            // SAVE DATA
            fs.writeFile(__dirname + "/data/user.json",
                            JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                result = {"Delete_success": 1};
                res.json(result);
            })
        })
    });
}