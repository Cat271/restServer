var express = require('express');
class Server{

	constructor(){
		this.app = express();
		this.port = process.env.PORT;

		//Middlewares
		this.middlewares();

		 //Rutas
		this.routes();
	}

	 middlewares(){
		//Directorio público
		this.app.use(express.static('public'));
	}

	 routes(){
		this.app.get('/hola', (req, res) => {
			res.send('Hola, Mundo');
		});
		// Editar nombres de usuario
		this.app.get('/edtUsuario', (req, res) => {
			var MongoClient=require('mongodb').MongoClient;
			var url="mongodb://localhost:27017";

			MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				var dbo=db.db("seginf");
				var consulta = { id: req.query.edtID };
				var cambiarNombre = { $set: {nombre: req.query.edtNombre }};

				dbo.collection("users").updateOne(consulta, cambiarNombre, function(err, res){
					if (err) throw err;
					console.log("Se ha modificado un nombre de usuario");
					db.close();
				});
			});

			res.send('<html><head><meta charset="utf-8"/><meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1" /><link rel="stylesheet" type="text/css" href="css/estilo.css"><title>Eliminar</title></head><body><br><div id="divLogin"><h1>Modificar usuario</h1></div><br><div id="divLogin"><br><h3>Se modific&oacute; informaci&oacute;n del ID:</h3><br><p>' + req.query.edtID + '</p><br><h3>Nuevo Usuario:</h3><br><p>' + req.query.edtNombre +'</p><br><br><table><tr><td><a href="ver"><button>Volver</button></a></td></tr></table><br></div><br></body></html>');

			var pdf=require('html-pdf');
			var content='';
			var hoy = new Date();
			var fechaRep = hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear()+'_a_las_'+hoy.getHours()+'-'+hoy.getMinutes()+'-'+hoy.getSeconds();

			setTimeout(function(){
				MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
					if (err) throw err;
					var dbo = db.db("seginf");
					var query = {};
					var resultado =dbo.collection("users").find(query).sort( { id: -1 } );
					var arregloDatos=function(err, result) {
						if (err) throw err;
						
						content='<HTML lang="es_MX"><head><meta charset="utf-8"><title>Reporte_del_'+fechaRep+'</title><style>body{font-family: Arial}table, th, td{border: 2px #000000 solid;border-collapse: collapse;padding:0.6em;margin:auto;}</style></head><center><br><h1>Reporte de usuarios</h1><p>Fecha: '+hoy.getDate()+' de '+(hoy.getMonth()+1)+' de '+hoy.getFullYear()+'.</p><p>Hora: '+hoy.getHours()+' : '+hoy.getMinutes()+' : '+hoy.getSeconds()+' hrs.</p><p>Generado despu&eacute;s de modificar un nombre de usuario.</p><table><tr><th><h3>ID:</h3></th><th><h3>Usuario:</h3></th><th><h3>Pass:</h3></th><th><h3>Rol:</h3></th></tr>'+result.map(function(bar){
						return '<tr><td><p>' + bar.id+'</p></td><td><p>' + bar.nombre+'</p></td><td><p>'+bar.pass+'</p></td><td><p>'+bar.rol + '</p></td></tr>'
						}) + '</table></center></body></HTML>';
						pdf.create(content).toFile('Reportes/Reporte_del_'+fechaRep+'.pdf', function(err, res){
						if (err){
							console.log(err);
						} else{
							console.log(res);
						}
					});
						db.close();
						console.log('Se imprimi\u00F3 el reporte del: ' + fechaRep);
					}
					resultado.toArray(arregloDatos);
				});
			console.log('Se retard\u00F3 la generaci\u00F3n del reporte a un segundo');
			}, 2000);
		});
		// Editar pass
		this.app.get('/edtPass', (req, res) => {
			var MongoClient=require('mongodb').MongoClient;
			var url="mongodb://localhost:27017";

			MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				var dbo=db.db("seginf");
				var consulta = { id: req.query.edtID };
				var cambiarPass = { $set: {pass: req.query.edtContra }};

				dbo.collection("users").updateOne(consulta, cambiarPass, function(err, res){
					if (err) throw err;
					console.log("Se he realizado una modificaci\u00F3n");
					db.close();
				});
			});

			res.send('<html><head><meta charset="utf-8"/><meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1" /><link rel="stylesheet" type="text/css" href="css/estilo.css"><title>Eliminar</title></head><body><br><div id="divLogin"><h1>Modificar usuario</h1></div><br><div id="divLogin"><br><h3>Se modific&oacute; informaci&oacute;n del ID:</h3><br><p>' + req.query.edtID +'</p><br><br><table><tr><td><a href="ver"><button>Volver</button></a></td></tr></table><br></div><br></body></html>');

			var pdf=require('html-pdf');
			var content='';
			var hoy = new Date();
			var fechaRep = hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear()+'_a_las_'+hoy.getHours()+'-'+hoy.getMinutes()+'-'+hoy.getSeconds();
			setTimeout(function(){
				MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
					if (err) throw err;
					var dbo = db.db("seginf");
					var query = {};
					var resultado =dbo.collection("users").find(query).sort( { id: -1 } );
					var arregloDatos=function(err, result) {
						if (err) throw err;
						
						content='<HTML lang="es_MX"><head><meta charset="utf-8"><title>Reporte_del_'+fechaRep+'</title><style>body{font-family: Arial}table, th, td{border: 2px #000000 solid;border-collapse: collapse;padding:0.6em;margin:auto;}</style></head><center><br><h1>Reporte de usuarios</h1><p>Fecha: '+hoy.getDate()+' de '+(hoy.getMonth()+1)+' de '+hoy.getFullYear()+'.</p><p>Hora: '+hoy.getHours()+' : '+hoy.getMinutes()+' : '+hoy.getSeconds()+' hrs.</p><p>Generado despu&eacute;s de realizar una modificaci&oacute;n.</p><table><tr><th><h3>ID:</h3></th><th><h3>Usuario:</h3></th><th><h3>Pass:</h3></th><th><h3>Rol:</h3></th></tr>'+result.map(function(bar){
						return '<tr><td><p>' + bar.id+'</p></td><td><p>' + bar.nombre+'</p></td><td><p>'+bar.pass+'</p></td><td><p>'+bar.rol + '</p></td></tr>'
						}) + '</table></center></body></HTML>';
						pdf.create(content).toFile('Reportes/Reporte_del_'+fechaRep+'.pdf', function(err, res){
						if (err){
							console.log(err);
						} else{
							console.log(res);
						}
					});
						db.close();
						console.log('Se imprimi\u00F3 el reporte del: ' + fechaRep);
					}
					resultado.toArray(arregloDatos);
				});
			console.log('Se retard\u00F3 la generaci\u00F3n del reporte a un segundo');
			}, 2000);
		});
		// Editar Rol
		this.app.get('/edtRol', (req, res) => {
			var MongoClient=require('mongodb').MongoClient;
			var url="mongodb://localhost:27017";

			MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				var dbo=db.db("seginf");
				var consulta = { id: req.query.edtID };
				var cambiarRol = { $set: {rol: req.query.edtNewRol }};

				dbo.collection("users").updateOne(consulta, cambiarRol, function(err, res){
					if (err) throw err;
					console.log("Se modific\u00F3 un rol de usuario");
					db.close();
				});
			});

			res.send('<html><head><meta charset="utf-8"/><meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1" /><link rel="stylesheet" type="text/css" href="css/estilo.css"><title>Eliminar</title></head><body><br><div id="divLogin"><h1>Modificar usuario</h1></div><br><div id="divLogin"><br><h3>Se modific&oacute; informaci&oacute;n del ID:</h3><br><p>' + req.query.edtID + '</p><br><h3>Nuevo rol de usuario:</h3><br><p>' + req.query.edtNewRol +'</p><br><br><table><tr><td><a href="ver"><button>Volver</button></a></td></tr></table><br></div><br></body></html>');

			var pdf=require('html-pdf');
			var content='';
			var hoy = new Date();
			var fechaRep = hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear()+'_a_las_'+hoy.getHours()+'-'+hoy.getMinutes()+'-'+hoy.getSeconds();
			setTimeout(function(){
				MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
					if (err) throw err;
					var dbo = db.db("seginf");
					var query = {};
					var resultado =dbo.collection("users").find(query).sort( { id: -1 } );
					var arregloDatos=function(err, result) {
						if (err) throw err;
						
						content='<HTML lang="es_MX"><head><meta charset="utf-8"><title>Reporte_del_'+fechaRep+'</title><style>body{font-family: Arial}table, th, td{border: 2px #000000 solid;border-collapse: collapse;padding:0.6em;margin:auto;}</style></head><center><br><h1>Reporte de usuarios</h1><p>Fecha: '+hoy.getDate()+' de '+(hoy.getMonth()+1)+' de '+hoy.getFullYear()+'.</p><p>Hora: '+hoy.getHours()+' : '+hoy.getMinutes()+' : '+hoy.getSeconds()+' hrs.</p><p>Generado despu&eacute;s de modificar un rol.</p><table><tr><th><h3>ID:</h3></th><th><h3>Usuario:</h3></th><th><h3>Pass:</h3></th><th><h3>Rol:</h3></th></tr>'+result.map(function(bar){
						return '<tr><td><p>' + bar.id+'</p></td><td><p>' + bar.nombre+'</p></td><td><p>'+bar.pass+'</p></td><td><p>'+bar.rol + '</p></td></tr>'
						}) + '</table></center></body></HTML>';
						pdf.create(content).toFile('Reportes/Reporte_del_'+fechaRep+'.pdf', function(err, res){
						if (err){
							console.log(err);
						} else{
							console.log(res);
						}
					});
						db.close();
						console.log('Se imprimi\u00F3 el reporte del: ' + fechaRep);
					}
					resultado.toArray(arregloDatos);
					
				});
				console.log('Se retard\u00F3 la generaci\u00F3n del reporte a un segundo');
			}, 2000);
		});
		// Borrar usuario
		this.app.get('/borrar', (req, res) => {
			var MongoClient = require('mongodb').MongoClient;
			var url = 'mongodb://localhost:27017';

			MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				var dbo = db.db("seginf");
				var borracion = { id: req.query.delID };

				dbo.collection("users").deleteOne(borracion, function(err, obj){
					if (err) throw err;
					console.log("Se borr\u00F3 un documento.");
					db.close();
				});
			});
			res.send('<html><head><meta charset="utf-8"/><meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1" /><link rel="stylesheet" type="text/css" href="css/estilo.css"><title>Eliminado</title></head><body><br><div id="divLogin"><h1>Eliminar usuario</h1></div><br><div id="divLogin"><br><h3>Se elimin&oacute; al usuario con el ID:</h3><br><p>' + req.query.delID+'</p><br><table><tr><td><a href="ver"><button>Volver</button></a></td></tr></table><br><br></div><br></body></html>');

			var pdf=require('html-pdf');
			var content='';
			var hoy = new Date();
			var fechaRep = hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear()+'_a_las_'+hoy.getHours()+'-'+hoy.getMinutes()+'-'+hoy.getSeconds();
			setTimeout(function(){
				MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				var dbo = db.db("seginf");
				var query = {};
				var resultado =dbo.collection("users").find(query).sort( { id: -1 } );
				var arregloDatos=function(err, result) {
					if (err) throw err;
					
					content='<HTML lang="es_MX"><head><meta charset="utf-8"><title>Reporte_del_'+fechaRep+'</title><style>body{font-family: Arial}table, th, td{border: 2px #000000 solid;border-collapse: collapse;padding:0.6em;margin:auto;}</style></head><center><br><h1>Reporte de usuarios</h1><p>Fecha: '+hoy.getDate()+' de '+(hoy.getMonth()+1)+' de '+hoy.getFullYear()+'.</p><p>Hora: '+hoy.getHours()+' : '+hoy.getMinutes()+' : '+hoy.getSeconds()+' hrs.</p><p>Generado despu&eacute;s de eliminar a un usuario.</p><table><tr><th><h3>ID:</h3></th><th><h3>Usuario:</h3></th><th><h3>Pass:</h3></th><th><h3>Rol:</h3></th></tr>'+result.map(function(bar){
					return '<tr><td><p>' + bar.id+'</p></td><td><p>' + bar.nombre+'</p></td><td><p>'+bar.pass+'</p></td><td><p>'+bar.rol + '</p></td></tr>'
					}) + '</table></center></body></HTML>';
					pdf.create(content).toFile('Reportes/Reporte_del_'+fechaRep+'.pdf', function(err, res){
					if (err){
						console.log(err);
					} else{
						console.log(res);
					}
				});
					db.close();
					console.log('Se imprimi\u00F3 el reporte del: ' + fechaRep);
				}
				resultado.toArray(arregloDatos);
			});
				console.log('Se retard\u00F3 la generaci\u00F3n del reporte a un segundo');
			}, 2000);
			//console.log('Se retard\u00F3 la generaci\u00F3n del reporte a medio segundo');
		});
		// Ver a los usuarios existentes
		this.app.get('/ver', (req,res) => {
			var MongoClient = require('mongodb').MongoClient;
			var url = "mongodb://localhost:27017/";

			MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				var dbo = db.db("seginf");
				var query = {};
				var resultado =dbo.collection("users").find(query).sort( { id: -1 } );
				var arregloDatos=function(err, result) {
					if (err) throw err;
					console.log('\u00A1Se realiz\u00F3 una consulta de informaci\u00F3n!');
					
					res.send('<HTML lang="es_MX"><head><meta charset="utf-8"/><meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1" /><title>Inicio</title><link rel="stylesheet" type="text/css" href="css/estilo.css"></head><body><br><div id="divTit"><h1>Usuarios registrados</h1></div><center><br><a href="singin.html"><button>Registrar</button></a><a href="modificar.html"><button>Modificar</button></a><a href="delete.html"><button>Eliminar</button></a></center><center><a href="genRep"><button>Generar Reporte</button></a></center><br><div id="divLogin"><table id="tablaVer"><tr id="tablaVer"><th id="tablaVer"><h3>ID:</h3></th><th id="tablaVer"><h3>Usuario:</h3></th><th id="tablaVer"><h3>Pass:</h3></th><th id="tablaVer"><h3>Rol:</h3></th></tr>'+result.map(function(bar){
					return '<tr id="tablaVer"><td id="tablaVer"><p>' + bar.id+'</p></td><td id="tablaVer"><p>' + bar.nombre+'</p></td><td id="tablaVer"><p>'+bar.pass+'</p></td><td id="tablaVer"><p>'+bar.rol + '</p></td></tr>'
					}) + '</table><br></div><center><br><a href="index.html"><button>Volver</button></a><br><br></center></body></HTML>');
					db.close();
				}
				resultado.toArray(arregloDatos);
			
			});
		});
		// Generar reporte
		this.app.get('/genRep', (req, res) => {
			var MongoClient = require('mongodb').MongoClient;
			var url = "mongodb://localhost:27017/";
			var pdf=require('html-pdf');
			var content='';
			var hoy = new Date();
			var dia = hoy.getDate();
			var mes = (hoy.getMonth()+1);
			if(dia ==1 || dia ==2 || dia ==3 || dia ==4 || dia ==5 || dia ==6 || dia ==7 || dia ==8 || dia ==9){
				dia='0'+dia;
			}
			if(mes ==1 || mes ==2 || mes ==3 || mes ==4 || mes ==5 || mes ==6 || mes ==7 || mes ==8 || mes ==9){
				mes='0'+mes;
			}
			var fechaRep = dia+'-'+ mes +'-'+hoy.getFullYear()+'_a_las_'+hoy.getHours()+'-'+hoy.getMinutes()+'-'+hoy.getSeconds();

			MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				var dbo = db.db("seginf");
				var query = {};
				var resultado =dbo.collection("users").find(query).sort( { id: -1 } );
				var arregloDatos=function(err, result) {
					if (err) throw err;
					content='<HTML lang="es_MX"><head><meta charset="utf-8"><title>Reporte_del_'+fechaRep+'</title><style>body{font-family: Arial}table, th, td{border: 2px #000000 solid;border-collapse: collapse;padding:0.6em;margin:auto;}</style></head><center><br><h1>Reporte de usuarios</h1><p>Fecha: '+ dia +' de '+ mes +' de '+hoy.getFullYear()+'.</p><p>Hora: '+hoy.getHours()+' : '+hoy.getMinutes()+' : '+hoy.getSeconds()+' hrs.</p><p>Generado a trav&eacute;s de consulta general.</p><table><tr><th><h3>ID:</h3></th><th><h3>Usuario:</h3></th><th><h3>Pass:</h3></th><th><h3>Rol:</h3></th></tr>'+result.map(function(bar){
					return '<tr><td><p>' + bar.id+'</p></td><td><p>' + bar.nombre+'</p></td><td><p>'+bar.pass+'</p></td><td><p>'+bar.rol + '</p></td></tr>'
					}) + '</table></center></body></HTML>';
					pdf.create(content).toFile('Reportes/Reporte_del_'+fechaRep+'.pdf', function(err, res){
					if (err){
						console.log(err);
					} else{
						console.log(res);
					}
				});
					db.close();
					console.log('Se imprimi\u00F3 el reporte del: ' + fechaRep);
				}
				resultado.toArray(arregloDatos);
				
			});
			res.send('<link rel="stylesheet" type="text/css" href="css/estilo.css">'+
				'<br><br><br><div id="divTit"><h1 id="h1Grande">Reporte generado</h1></div>'+
				'<br><div id="divLogin"><br><h3>Se ha generado un reporte acerca del estatus actual de los usuarios.</h3><br><p>Fecha: '+ dia +' de '+ mes +' de '+hoy.getFullYear()+'.</p><p>Hora: '+hoy.getHours()+' : '+hoy.getMinutes()+' : '+hoy.getSeconds()+' hrs.</p><p>Generado a trav&eacute;s de consulta general.</p><br>'+
				'<p>Cons&uacute;ltalo en la carpeta de reportes</p><br></div>'+
				'<center><br><br><a href="C:/Users/Cristian/Documents/IDSM11/SEGURIDAD INFORMATICA/PU2/restServer/Reportes"><button>Ver Reporte</button></a><a href="ver"><button>Volver</button></a></center>');
		});
		// Agregar a un nuevo usuario
		this.app.get('/singinInsert', (req, res) => {
			var hoy = new Date();
			var fecha = hoy.getFullYear()+''+(hoy.getMonth()+1)+hoy.getDate()+hoy.getHours()+hoy.getMinutes()+hoy.getSeconds();
			
			var MongoClient = require('mongodb').MongoClient;
			var url = "mongodb://localhost:27017/";

			MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
				if (err) throw err;
				let dbo = db.db("seginf");
				let myobj = { id: fecha, nombre: req.query.regUser, pass: req.query.regPass, rol: req.query.regRol };
				dbo.collection("users").insertOne(myobj, function(err, res){
					if (err) throw err;
					console.log("Se insert\u00F3 1 documento.");
					//console.log(fecha);
				});
			});

			res.send('<link rel="stylesheet" type="text/css" href="css/estilo.css"><div id="divLogin"><br><h1>Usuario registrado:</h1><br><h3>' + req.query.regUser + '</h3><br></div><center><br><br><a href="ver"><button>Volver</button></a></center>');

			var pdf=require('html-pdf');
			var content='';
			var fechaRep = hoy.getDate()+'-'+(hoy.getMonth()+1)+'-'+hoy.getFullYear()+'_a_las_'+hoy.getHours()+'-'+hoy.getMinutes()+'-'+hoy.getSeconds();
			setTimeout(function(){
				MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db){
					if (err) throw err;
					var dbo = db.db("seginf");
					var query = {};
					var resultado =dbo.collection("users").find(query).sort( { id: -1 } );
					var arregloDatos=function(err, result) {
						if (err) throw err;
						
						content='<HTML lang="es_MX"><head><meta charset="utf-8"><title>Reporte_del_'+fechaRep+'</title><style>body{font-family: Arial}table, th, td{border: 2px #000000 solid;border-collapse: collapse;padding:0.6em;margin:auto;}</style></head><center><br><h1>Reporte de usuarios</h1><p>Fecha: '+hoy.getDate()+' de '+(hoy.getMonth()+1)+' de '+hoy.getFullYear()+'.</p><p>Hora: '+hoy.getHours()+' : '+hoy.getMinutes()+' : '+hoy.getSeconds()+' hrs.</p><p>Generado despu&eacute;s de agregar a un usuario.</p><table><tr><th><h3>ID:</h3></th><th><h3>Usuario:</h3></th><th><h3>Pass:</h3></th><th><h3>Rol:</h3></th></tr>'+result.map(function(bar){
						return '<tr><td><p>' + bar.id+'</p></td><td><p>' + bar.nombre+'</p></td><td><p>'+bar.pass+'</p></td><td><p>'+bar.rol + '</p></td></tr>'
						}) + '</table></center></body></HTML>';
						pdf.create(content).toFile('Reportes/Reporte_del_'+fechaRep+'.pdf', function(err, res){
						if (err){
							console.log(err);
						} else{
							console.log(res);
						}
					});
						db.close();
						console.log('Se imprimi\u00F3 el reporte del: ' + fechaRep);
					}
					resultado.toArray(arregloDatos);
					
				});
			console.log('Se retard\u00F3 la generaci\u00F3n del reporte a un segundo');
			}, 2000);
		});
		// Pagina de 404
		this.app.get('/*', (req, res) => {
			res.send('<link rel="stylesheet" type="text/css" href="css/estilo.css">'+
				'<br><br><br><div id="divTit"><h1 id="h1Grande">&iexcl;Ups! 404...</h1></div>'+
				'<br><div id="divLogin"><br><h3>&iexcl;Qu&eacute; mala suerte! Una p&aacute;gina de error 404 es a donde menos quieres llegar.</h3><br>'+
				'<p>Lo que est&aacute;s buscando no existe, bro... &iquest;Seguro que lo escribiste bien?</p><br></div>'+
				'<center><br><br><a href="index.html"><button>Volver</button></a></center>');
		});
	}

	listen(){
		this.app.listen(this.port, () => {
			console.log('Servidor listo. Escuchando al puerto', this.port + "...");
		});
	}
}
module.exports = Server;