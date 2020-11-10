export class DanhSachSinhVien{
    constructor(){
        this.DSSV = new Array();
    };
    addSinhVien(svMoi){
        this.DSSV.push(svMoi); 
    }; 
    renderHTML(){
        let content = ""; 
        content = this.DSSV.reduce((tdContent, item, index)=>{
            tdContent += `
            <tr class="trSinhVien" data-id="${item.masv}" data-index="${index}" id="rowSV" onclick="ChinhSuaSinhVien(event)">
                <td><input type="checkbox" value="${item.masv}" class="ckbMaSV"></input></td>
                <td class="maSV">${item.masv}</td>
                <td class="tenSV">${item.hoten}</td>
                <td class="email">${item.email}</td>
                <td class="sdt">${item.sdt}</td>
                <td class="cmnd">${item.cmnd}</td>
                <td class="diemToan">${item.diemToan}</td>
                <td class="diemLy">${item.diemLy}</td>
                <td class="diemHoa">${item.diemHoa}</td>
                <td class="diemTB">${item.diemTB}</td>
                <td class="loai">${item.loai}</td>
            </tr>`;
            return tdContent; 
        },""); 
            return content; 
    }
    XoaSinhVien(listSVXoa){
        for (let i = 0; i < listSVXoa.length; i++){//array mảng chứa mã SV muốn xoá
            for (let j = 0; j < this.DSSV.length; j++){ //array mảng chứa tất cả SV
                let svCurrent = this.DSSV[j]; //lấy SV current ra, so sanh mã số SVcurrent 
                if(svCurrent.masv == listSVXoa[i]){
                    this.DSSV.splice(j,1);//xoá tại index của mảng 1 phần tử sinh viên 
                }
            }
        }
    }
    TimSVTheoTen(tenSV){
        let listKQTimKiem = new DanhSachSinhVien(); 
        for (let i = 0; i < this.DSSV.length; i++){
            let svCurrent = this.DSSV[i]; 
            if(svCurrent.hoten.toLowerCase().trim().indexOf(tenSV.toLowerCase().trim()) != -1){
                listKQTimKiem.addSinhVien(svCurrent); 
            }
        }
        return listKQTimKiem; 
    } 
    TimSVTheoMa(masv){
        for (let i = 0; i < this.DSSV.length; i++){
            let svCurrent = this.DSSV[i]; 
            if(svCurrent.masv == masv){
                return svCurrent; 
            }
        }
        return null; 
    }
    SuaSinhVien(svCapNhat){
        for (let i = 0; i < this.DSSV.length; i++){
            let svUpdate = this.DSSV[i]; 
            if(svCapNhat.masv == svUpdate.masv){
                svUpdate.hoten = svCapNhat.hoten; 
                svUpdate.email = svCapNhat.email; 
                svUpdate.sdt = svCapNhat.sdt; 
                svUpdate.cmnd = svCapNhat.cmnd; 
                svUpdate.diemToan = svCapNhat.diemToan; 
                svUpdate.diemLy = svCapNhat.diemLy; 
                svUpdate.diemHoa = svCapNhat.diemHoa;  
            }
        }
    }
    //  compare( a, b ) {
    //     if ( a.masv < b.masv ){
    //       return -1;
    //     }
    //     if ( a.masv > b.masv ){
    //       return 1;
    //     }
    //     return 0;
    //   }
    //   sortTheMa() {
    //  this.DSSV.sort(compare); 
    //   }
    sortTheMa(){
        let listSort =  new DanhSachSinhVien(); 
        listSort =  this.DSSV.sort((a,b)=>{
            if(a.masv > b.masv) {
                return 1; 
            } else if (b.masv > a.masv){
                return -1; 
            } else return 0; 
        }); 
        return listSort; 
    }

}