import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  uname = "";
  upwd = "";

  doLogin() {
    console.log(this.uname, this.upwd);

    /**
     * 请求方式: GET 和 POST
     * - GET: 请求地址 和 参数在一起   路径?参数=值&参数=值...
     * - POST: 请求地址 和 参数拆开写
     */
    let url = "http://101.96.128.94:9999/data/user/login.php"; //地址
    let body = `uname=${this.uname}&upwd=${this.upwd}`; //参数
    // 账号:doudou  密码:123456

    // 此服务器要求 请求头 必须是 application/x-www-form-urlencoded 格式
    // 配置项
    let options = {
      // 固定的格式要求
      headers: new HttpHeaders({
        "content-type": "application/x-www-form-urlencoded",
      }),
    };

    this.http.post(url, body, options).subscribe((res: any) => {
      console.log(res);

      let code = res.code;
      if (code == 200) {
        // 弹出框
        this.alertC
          .create({ header: "恭喜,登录成功", buttons: ["确定"] })
          .then((res) => res.present());
      } else {
        this.alertC
          .create({ header: "很遗憾, 登录失败", buttons: ["确定"] })
          .then((res) => res.present());
      }
    });
  }

  constructor(public http: HttpClient, public alertC: AlertController) {}

  ngOnInit() {}
}
