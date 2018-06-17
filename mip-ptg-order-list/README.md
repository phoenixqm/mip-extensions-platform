# mip-ptg-order-list

mip-ptg-order-list 组件说明

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v1/mip-ptg-order-list/mip-ptg-order-list.js

## 示例

### 基本用法
```html
<mip-ptg-order-list>
   <script type="application/json">
       <%- JSON.stringify(data) %>
   </script>
   <template type="mip-mustache" id="ptg-order-list">
         {{#list}}
       <mip-ptg-order-item class="row">
          <p class='row_p'>
             <span class="status">
                {{desc_str}}
             </span>
             <span class="row_header">
                编号: {{order_number}}
             </span>
          </p>
          <div class="info">
             <mip-img layout="responsive" width="85px" height="22px"
              class="header" src="{{master.header.small}}" ></mip-img>
              <span class="name">{{master.name}}</span>
              <span class="price">￥{{master.price.ptg_price/100}}</span>
              <div class="message">
                <mip-img layout="responsive" width="85px" height="22px"
                 class="age_img" src="i/age.png" ></mip-img>
                 <span class="age">{{master.age}}岁</span>
                 <mip-img layout="responsive" width="85px" height="22px"
                 class="work_year_img" src="i/work_year.png" ></mip-img>
                 <span class="work_year">{{master.work_year}}年</span>
                 <mip-img layout="responsive" width="85px" height="22px"
                 class="jiguan_img" src="i/jiguan.png" ></mip-img>
                 <span class="jiguan">{{master.jiguan}}</span>
              </div>
          </div>
          <div class="row_footer">
             <div class="btn_list">
                <div class="btn tjBtn">推荐</div>
                <div class="btn showBtn">查看合同</div>
                <div class="btn depositBtn">交定金</div>
                <div class="btn payBtn">付款</div>
                <div class="btn shanghuBtn">续签</div>
                <div class="btn xudanBtn">续签</div>
                <div class="btn delBtn">删除</div>
                <div class="btn callBtn">联系客服</div>
             </div>
             <div class="clear"></div>
          </div>
       </mip-ptg-order-item>
         {{/list}}
      </div>
   </template>
    
</mip-ptg-order-list>
```

## 属性

### {属性名}

说明：{说明}
必选项：{是|否}
类型：{类型}
取值范围：{取值范围}
单位：{单位}
默认值：{默认值}

## 注意事项

