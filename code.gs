var ss = SpreadsheetApp.getActiveSpreadsheet();
var database = ss.getSheetByName('Database');
var home = ss.getSheetByName('Home');

class Mahasiswa {
  // Property : 
  constructor(nama, poin, dbHari, dbMain, dbTidur) {
    this.nama = nama;
    this.poin = poin;
    this.dbHari = dbHari
    this.dbMain = dbMain
    this.dbTidur = dbTidur
  }
  //  Method :
  absen(hari) {
    this.dbHari += hari
    this.poin += hari;
    return `Poin Hari : ${this.poin}`;
  }
  main(jam) {
    this.dbMain += jam
    this.poin += jam;
    return `Poin Main : ${this.poin}`;
  }
  tidur(jam) {
    this.dbTidur += jam
    this.poin += jam * 2;
    return `Poin Tidur : ${this.poin}`;
  }
}


// Entry poin at Home
var nama = home.getRange('a2').getValue();
var nameIndex = database.getRange('a2:a4').getValues().join().split(',').indexOf(nama);
var poin = database.getRange((nameIndex + 2),2).getValue();
var dbHari = database.getRange((nameIndex + 2),3).getValue();
var dbMain = database.getRange((nameIndex + 2),4).getValue();
var dbTidur = database.getRange((nameIndex + 2),5).getValue();
var siswa = new Mahasiswa(nama, poin, dbHari, dbMain, dbTidur);


// Input to History
var lastRow = ss.getSheetByName('History').getLastRow()+1;


function studentPoint() {
  var hasil = `
              Nama: ${siswa.nama}
              Poin Awal: ${poin}
              ${siswa.absen(home.getRange('b2').getValue())} 
              ${siswa.main(home.getRange('c2').getValue())} 
              ${siswa.tidur(home.getRange('d2').getValue())}
              `
  for (i=1; i<=home.getLastColumn(); i++) {
  var columnHistory = home.getRange(2,i).getValue();
  ss.getSheetByName('History').getRange(lastRow,i).setValue(columnHistory);

  // Update to Database
  database.getRange((nameIndex + 2),2).setValue(siswa.poin);  
  database.getRange((nameIndex + 2),3).setValue(siswa.dbHari);  
  database.getRange((nameIndex + 2),4).setValue(siswa.dbMain);  
  database.getRange((nameIndex + 2),5).setValue(siswa.dbTidur);  
  }

  Logger.log(hasil);
  Logger.log(siswa.dbHari)
}
