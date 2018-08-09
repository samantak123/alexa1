$.response.contentType = "text/html";
var output = "My Personal Library!<br><br>";

//Open a database connection
var conn = $.db.getConnection();

//Prepare a simple SQL statement on the system table "DUMMY"
var pstmt = conn.prepareStatement('SELECT * FROM "MYA"."alexa.data::mydata.Book"');

//Execute the query
var rs = pstmt.executeQuery();

//Check the query result
if (!rs.next()) {
    //Something went wrong: Return an error
    $.response.setBody("Failed to retrieve data");
    $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
    //All went fine: Return the Query result
    output = output + "This is the response from my SQL:<br><br>";
    output = output + rs.getString(1) + ' ' +  rs.getString(2) + ' ' +  rs.getString(3) + ' ' +  rs.getString(4) + '<br>';
}

//Close the database connection
rs.close();
pstmt.close();
conn.close();

//Return the HTML response.
$.response.setBody(output);
