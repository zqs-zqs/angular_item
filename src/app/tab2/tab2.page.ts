import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  constructor(public http: HttpClient) {}

  // 属性 可以复用
  url = "http://101.96.128.94:9999/data/product/list.php?pno=";

  res: Res;

  ngOnInit(): void {
    this.http.get(this.url + 1).subscribe((res: any) => {
      console.log(res);

      this.res = res;
    });
  }

  loadData(event) {
    // 下一页:  当前页+1
    let nextUrl = this.url + (this.res.pno + 1);

    this.http.get(nextUrl).subscribe((res: Res) => {
      console.log(res);

      // 合并数据
      res.data = this.res.data.concat(res.data);

      this.res = res;

      // 结束加载更多的状态
      event.target.complete();
    });
  }

  doRefresh(event) {
    this.http.get(this.url + 1).subscribe((res: any) => {
      console.log(res);

      this.res = res;

      event.target.complete(); //结束刷新
    });
  }
}

//
interface Res {
  data: Data[];
  pageCount: number;
  pageSize: number;
  pno: number;
  recordCount: number;
}

interface Data {
  is_onsale: string;
  lid: string;
  pic: string;
  price: string;
  sold_count: string;
  title: string;
}
