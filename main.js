//import lớp đối tượng 
import { SinhVien } from './SinhVien.js';
import { DanhSachSinhVien } from './DanhSachSinhVien.js';
let danhSachSinhVien = new DanhSachSinhVien();

//function getEl ID; 
const DomID = (id) => {
    return document.getElementById(id);
}
//bổ sung thuộc tính 
SinhVien.prototype.diemTB = '';
SinhVien.prototype.loai = '';
//thêm phương thức
SinhVien.prototype.tinhDTB = function () {
    this.diemTB = Math.floor((Number(this.diemHoa) + Number(this.diemLy) + Number(this.diemToan)) / 3);
    return this.diemTB;
}
SinhVien.prototype.xepLoai = function () {
    if (this.diemTB <= 10 && this.diemTB >= 8) {
        this.loai = "Giỏi";
    } else if (this.diemTB < 8 && this.diemTB >= 6.5) {
        this.loai = "Khá";
    } else if (this.diemTB < 6.5 && this.diemTB >= 5) {
        this.loai = "Trung Bình";
    } else {
        this.loai = "Yếu";
    }
}
const dummyData = () => {
    let sv1 = new SinhVien(4, "thoa", "thoanguyen@gmail.com", 12, 12, 5, 5, 5);
    sv1.tinhDTB();
    sv1.xepLoai();
    danhSachSinhVien.addSinhVien(sv1);

    let sv2 = new SinhVien(2, "truc", "trucnguyen@gmail.com", 13, 13, 8, 9, 10);
    sv2.tinhDTB();
    sv2.xepLoai();
    danhSachSinhVien.addSinhVien(sv2);

    let sv3 = new SinhVien(3, "huy", "huynguyen@gmail.com", 13, 11, 8, 5, 10);
    sv3.tinhDTB();
    sv3.xepLoai();
    danhSachSinhVien.addSinhVien(sv3);

    let sv4 = new SinhVien(4, "phuc", "phucnguyen@gmail.com", 10, 10, 8, 10, 10);
    sv4.tinhDTB();
    sv4.xepLoai();
    danhSachSinhVien.addSinhVien(sv4);
}
const showData = (tbody) => {
    DomID(tbody).innerHTML = danhSachSinhVien.renderHTML();
}
const showDataTimKiemTheoTen = (tbody) => {
    let ten = DomID("tukhoa").value.trim();
    let list = danhSachSinhVien.TimSVTheoTen(ten);
    DomID(tbody).innerHTML = list.renderHTML();
}
dummyData();
showData("tbodySinhVien");
const ThemSinhVien = () => {
    //lấy dữ liệu từ người dùng nhập vào 
    let masv = DomID("masv").value;
    let hoten = DomID("hoten").value;
    let cmnd = DomID("cmnd").value;
    let sdt = DomID("sdt").value;
    let email = DomID("email").value;
    let diemToan = DomID("Toan").value;
    let diemHoa = DomID("Ly").value;
    let diemLy = DomID("Hoa").value;
    let sinhVien = new SinhVien(masv, hoten, email, sdt, cmnd, diemToan, diemLy, diemHoa);
    danhSachSinhVien.addSinhVien(sinhVien);
    sinhVien.tinhDTB();
    sinhVien.xepLoai();
    showData("tbodySinhVien");
}

DomID("btn-add").addEventListener("click", () => {
    ThemSinhVien();
});

const XoaSinhVien = () => {
    //mảng array checkbox 
    let listMaSV = document.getElementsByClassName("ckbMaSV");
    //mảng mã sinh viên đc chọn; 
    let listMaSVDuocChon = [];
    for (let i = 0; i < listMaSV.length; i++) {
        if (listMaSV[i].checked) {
            listMaSVDuocChon.push(listMaSV[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(listMaSVDuocChon);
    showData("tbodySinhVien");
}
DomID("btn-delete").addEventListener("click", () => {
    XoaSinhVien();
});
const TimKiemSinhVien = () => {
    showDataTimKiemTheoTen("tbodySinhVien");
}
window.TimKiemSinhVien = TimKiemSinhVien;
TimKiemSinhVien();

const ChinhSuaSinhVien = (e) => {
    // let id = e.target.getAttribute("data-id"); 
    let masv = e.currentTarget.getAttribute("data-id");
    let sinhVien = danhSachSinhVien.TimSVTheoMa(masv);
    if (sinhVien != null) {
        DomID("masv").value = sinhVien.masv; 
        DomID("hoten").value = sinhVien.hoten;
        DomID("cmnd").value = sinhVien.cmnd;
        DomID("sdt").value = sinhVien.sdt;
        DomID("email").value = sinhVien.email;
        DomID("Toan").value = sinhVien.diemToan;
        DomID("Ly").value = sinhVien.diemLy;
        DomID("Hoa").value = sinhVien.diemHoa;
    }
}
const LuuSinhVien = () => {
    let masv = DomID("masv").value;
    let hoten = DomID("hoten").value;
    let cmnd = DomID("cmnd").value;
    let sdt = DomID("sdt").value;
    let email = DomID("email").value;
    let diemToan = DomID("Toan").value;
    let diemHoa = DomID("Ly").value;
    let diemLy = DomID("Hoa").value;

    let sinhVien = new SinhVien(masv, hoten, email, sdt, cmnd, diemToan, diemLy, diemHoa);
    danhSachSinhVien.SuaSinhVien(sinhVien);
    showData("tbodySinhVien");
}
window.ChinhSuaSinhVien = ChinhSuaSinhVien;
window.LuuSinhVien = LuuSinhVien;

const SetStorage = () => {
    let jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
    localStorage.setItem("DanhSachSV", jsonDanhSachSinhVien);
}
const GetStorage = () => {
    let jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    let mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    danhSachSinhVien.DSSV = mangDSSV;
    showData("tbodySinhVien");
}
window.SetStorage = SetStorage;
window.GetStorage = GetStorage;


const SapXep = (e) => { 
    let target = e.currentTarget; 
            let order = target.getAttribute("data-order"); 
            let column = target.getAttribute("data-column"); 
            order = order === "desc"? "asc": "desc"; 
            target.setAttribute("data-order", order); 
            let listSort = danhSachSinhVien.sortTheMa(order, column); 
            DomID("tbodySinhVien").innerHTML =  listSort.renderHTML(); 
    
}
window.SapXep = SapXep; 
const sort = (e) => {
    e.preventDefault(); 
    let rank = e.currentTarget.getAttribute("data-rank");
    const arraySapXepTheoRank =  danhSachSinhVien.sortXepLoai(rank); 

    DomID("tbodySinhVien").innerHTML =  arraySapXepTheoRank.renderHTML(); 

}
window.sort = sort; 

