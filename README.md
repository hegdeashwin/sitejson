sitejson
-------------

This is Node commandline application used to read json data from 'pagedata.json' and puts in the web page. You need to define the placeholders in the web page wrap with ++. 
For eg.
In markup,
	<title>++pagetitle++</title>
	
In pagedata.json,
	{
		"title": "First Page"
	}
To run the program run the following command 
	sitejson ./inputdirectory
where 'inputdirectory' is the where all html files are kept.	
	
	