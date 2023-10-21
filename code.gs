class Mahasiswa {
  // Property : 
  constructor(nama, poin) {
    this.nama = nama;
    this.poin = poin;
  }
  //  Method :
  absen(hari) {
    this.poin += hari;
    return `Poin Hari : ${this.poin}`;
  }
  main(jam) {
    this.poin += jam;
    return `Poin Hain : ${this.poin}`;
  }
  tidur(jam) {
    this.poin += jam * 2;
    return `Poin Tidur : ${this.poin}`;
  }
}

var ss = SpreadsheetApp.getActiveSpreadsheet();
var database = ss.getSheetByName('Database');
var home = ss.getSheetByName('Home');

// Entry poin at Home
var nama = home.getRange('a2').getValue();
var nameIndex = database.getRange('a2:a4').getValues().join().split(',').indexOf(nama);
var poin = database.getRange((nameIndex + 2),2).getValue();
var siswa = new Mahasiswa(nama,poin);

// Input to History
var namaDb = database.getRange((nameIndex + 2),2);
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
  }

  Logger.log(hasil);
  // Logger.log(namaDb.setValue(`${siswa.poin}`));
}
