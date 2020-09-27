<template>
  <div class="login-wrap scrollbar">
    <div class="login-header">
      <img class="imgLogo" src="../../assets/images/logo.png" alt="毕节市住房公积金中心">
      <div class="header-right">
        <DateTime></DateTime>
      </div>
    </div>
    <el-row class="model-box" :gutter="25">
      <el-col :span="6">
        <div @click="goPage('unitInform')" class="model-card" style="background-color: rgba(238, 104, 92, 0.9);">
          <div class="card-content">
            <i class="el-icon-school"></i>
            <div class="card-title">单位信息查询</div>
          </div>
        </div>
        <div @click="goPage('message')" class="model-card">
          <el-row style="height: 100%;">
            <el-col :span="8" style="height: 100%; background-color: rgba(238, 142, 4, 0.9);">
              <div class="card-content">
                <i class="el-icon-mic" style="font-size: 80px;"></i>
                <div class="card-title" style="font-size: 30px;">中心动态</div>
              </div>
            </el-col>
            <el-col :span="16" style="height: 100%; background-color: #fff;">
              <ul>
                <li class="message-box" v-for="item in message">
                  <p style="text-indent: 20px; color: #527d7f;">{{item.content.length < 20 ? item.content : item.content.substr(0, 20) + '...'}}</p>
                  <p style="text-align: right; font-size: 18px; margin-top: 5px; color: #5f9ea0;">{{item.time}}</p>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div @click="goPage('personInform')" class="model-card" style="height: 400px; background-color: rgba(22, 152, 228, 0.9);">
          <div class="card-content">
            <i class="el-icon-user" style="font-size: 150px; margin-top: 80px; margin-bottom: 30px;"></i>
            <div class="card-title" style="font-size: 40px;">个人信息查询</div>
          </div>
        </div>
        <el-row :gutter="15">
          <el-col :span="12">
            <div @click="goPage('guide')" class="model-card" style="height: 200px; margin-top: 0; background-color: rgba(70, 192, 169, 0.9);">
              <div class="card-content">
                <i class="el-icon-question" style="margin-top: 25px;margin-bottom: 10px;"></i>
                <div class="card-title">办事指南</div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div @click="goPage('complaint')" class="model-card" style="height: 200px; margin-top: 0; background-color: rgba(92, 75, 187, 0.9);">
              <div class="card-content">
                <i class="el-icon-message" style="margin-top: 25px;margin-bottom: 10px;"></i>
                <div class="card-title">投诉建议</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <div @click="goPage('policy')" class="model-card" style="background-color: rgba(179, 110, 219, 0.9);">
          <div class="card-content">
            <i class="el-icon-info"></i>
            <div class="card-title">政策查询</div>
          </div>
        </div>
        <div @click="goPage('repayment')" class="model-card" style="background-color: rgba(238, 142, 4, 0.9);">
          <div class="card-content">
            <i class="fa fa-jpy"></i>
            <div class="card-title">还款计算</div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div @click="goPage('network')" class="model-card" style="background-color: rgba(238, 104, 92, 0.9);">
          <div class="card-content">
            <i class="el-icon-location-information"></i>
            <div class="card-title">服务网点</div>
          </div>
        </div>
        <div @click="goPage('build')" class="model-card" style="background-color: rgba(92, 75, 187, 0.9);">
          <div class="card-content">
            <i class="el-icon-office-building"></i>
            <div class="card-title">合作楼盘</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="loginTitle" :visible.sync="loginBox" width="35%" @close="personLogin">
      <el-form v-if="!readLoginBox" :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="dwzh">
          <el-input v-model="param.dwzh" placeholder="请输入单位账号" size="medium">
            <el-button size="small" slot="prepend" icon="el-icon-postcard"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="初始密码为经办人身份证后六位"
            v-model="param.password"
            size="medium"
          >
            <el-button size="small" slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="dynamicPassword">
          <el-input
            v-model="param.dynamicPassword"
            placeholder="请输入短信验证码"
            size="medium"
          >
            <el-button size="small" slot="prepend" icon="el-icon-chat-dot-round"></el-button>
            <el-button size="small" slot="append" @click="getCode" :disabled="countDown !== 60">{{countText}}</el-button>
          </el-input>
        </el-form-item>
        <div class="agreement">
          <el-checkbox v-model="agreement"></el-checkbox>
          <span>我已阅读并同意
            <span class="agreement-file" @click="loginVisible = true">《毕节市住房公积金业务大厅登录》</span>
            协议和
            <span class="agreement-file" @click="privacyVisible = true">《毕节市住房公积金管理中心隐私保护政策》</span>
            协议
          </span>
        </div>
        <div class="login-btn">
          <el-button type="primary" :loading="loading" @click="submitForm()">登录</el-button>
        </div>
        <el-button style="float: right" type="text" size="small" @click="personLogin">
          个人登录
        </el-button>
      </el-form>
      <el-form v-if="readLoginBox" label-width="0px" class="ms-content">
        <el-form-item >
          <el-input v-model="ZJHM" placeholder="请将身份证放在读取区域" size="medium">
            <el-button size="small" slot="prepend" icon="el-icon-postcard"></el-button>
            <el-button size="small" slot="append" @click="getIdCard">读取</el-button>
          </el-input>
        </el-form-item>
        <div class="agreement">
          <el-checkbox size="medium" v-model="agreement"></el-checkbox>
          <span>我已阅读并同意
            <span class="agreement-file" @click="loginVisible = true">《毕节市住房公积金业务大厅登录》</span>
            协议和
            <span class="agreement-file" @click="privacyVisible = true">《毕节市住房公积金管理中心隐私保护政策》</span>
            协议
          </span>
        </div>
        <div class="login-btn">
          <el-button type="primary" :loading="loading" @click="submitReadForm()">登录</el-button>
        </div>
        <el-button style="float: right" type="text" size="small" @click="unitLogin">
          单位登录
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog class="noHeader" :visible.sync="loginVisible" :close-on-click-modal="false" fullscreen
               :show-close="false" center>
      <div>
        <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span style="font-family:黑体; font-size:22pt">毕节市住房公积金大数据综合云平台注册登陆协议</span>
        </p>
        <h5
          style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
          <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">一、【目的意义】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">为保证网上公积金业务服务用户信息的真实性、合法性和有效性，自然人、法人用户注册、验证应采用实名制。统一用户注册和验证是开展互联网+公积金业务服务、建立行政机关和行政相对人线上服务法律关系的前提，是今后全国公积金业务服务实现网上“一地注册，各地互认”的基础。在您成为毕节市住房公积金大数据综合云平台实名注册用户（简称“注册用户”）之前，请</span><span
          style="font-family:微软雅黑; font-size:10.5pt">确认您</span><span style="font-family:微软雅黑; font-size:10.5pt">已充分阅读、理解并接受本协议的全部内容，并在登陆使用的过程中同意遵循本协议之所有约定。</span>
        </p><h5
        style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
        <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">二、【协议适用主体范围】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">公积金业务服务门户的运营管理权归毕节市住房公积金管理中心所有。本协议是您和毕节市住房公积金管理中心，明确双方通过毕节市住房公积金综合服务平台网上办事大厅办理公积金业务服务事项过程中的权利义务所订立的协议。订立本协议的用户，应当是具备完全民事权利能力和完全民事行为能力的自然人。</span>
        </p><h5
        style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
        <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">三、【服务内容】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">注册用户能够登陆使用毕节市住房公积金大数据综合云平台，访问互联网公积金业务服务门户网站、检索静态信息、进行在线咨询、申办公积金业务服务事项，可在专属用户空间查询所办事项的过程信息和历史信息，储存信息资料，并自行维护用户空间信息。</span>
        </p><h5
        style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
        <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">四、【用户承诺与授权】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span
          style="font-family:微软雅黑; font-size:10.5pt">用户在公积金业务服务门户进行注册和使用本公积金业务服务平台时承诺和确认：</span></p>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">（1）提供及时、详尽及准确的个人资料；</span></p>
        <p style="margin:3.75pt 0pt 0pt"><span
          style="font-family:微软雅黑; font-size:10.5pt">（2）运用本人手机号码、身份证号、公积金</span><span
          style="font-family:微软雅黑; font-size:10.5pt">帐号</span><span
          style="font-family:微软雅黑; font-size:10.5pt">等个人信息进行实名验证；</span></p>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">（3）及时更新注册资料；</span></p>
        <p style="margin:3.75pt 0pt 0pt"><span
          style="font-family:微软雅黑; font-size:10.5pt">（4）同意接收来自毕节市住房公积金管理中心推送的信息；</span>
        </p>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">（5）在提请公积金业务服务事项办理过程中，按服务内容要求提供真实、准确的要件材料，并及时对上传本平台的要件材料做好更新维护；</span>
        </p>
        <p style="margin:3.75pt 0pt 0pt"><span
          style="font-family:微软雅黑; font-size:10.5pt">（6）自愿选择物流快递、网上支付等第三</span><span
          style="font-family:微软雅黑; font-size:10.5pt">方服务</span><span style="font-family:微软雅黑; font-size:10.5pt">时，及时提供真实姓名、联系地址、联系方式、账户等相关个人信息；</span>
        </p>
        <p style="margin:3.75pt 0pt 0pt"><span
          style="font-family:微软雅黑; font-size:10.5pt">（7）不存放与公积金业务服务申办无关的信息内容。</span></p>
        <h5
          style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
          <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">五、【用户信息保障】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">毕节市住房公积金管理中心依法保护个人隐私，不违法违规向与公积金业务服务无关的第三方提供用户注册资料。</span>
        </p><h5
        style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
        <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">六、【用户的密码和安全性】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span
          style="font-family:微软雅黑; font-size:10.5pt">考虑到注册用户是特定的行政相对人，以其</span><span
          style="font-family:微软雅黑; font-size:10.5pt">帐号</span><span style="font-family:微软雅黑; font-size:10.5pt">操作的行为由注册用户承担相应法律责任。因此，注册用户应妥善保管密码，不得将</span><span
          style="font-family:微软雅黑; font-size:10.5pt">帐号</span><span style="font-family:微软雅黑; font-size:10.5pt">、密码提供给他人使用。建议定期修改密码，以确保</span><span
          style="font-family:微软雅黑; font-size:10.5pt">帐号</span><span
          style="font-family:微软雅黑; font-size:10.5pt">安全。</span></p>
        <h5
          style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
          <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">七、【禁止条款】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">注册用户应严格遵守国家有关法律法规，有违反法律法规行为的，毕节市住房公积金管理中心有权终止为用户提供服务，并保留追责的权利。</span>
        </p><h5
        style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
        <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">八、【结束服务】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">注册用户若反对任何服务条款或对后来的条款修改有异议，或不需要接受相关公积金业务服务，可自行注销</span><span
          style="font-family:微软雅黑; font-size:10.5pt">帐号</span><span style="font-family:微软雅黑; font-size:10.5pt">，如之后需要使用相关服务，需重新进行注册认证。</span>
        </p><h5
        style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
        <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">九、【注意事项】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">毕节市住房公积金管理中心将加强网络安全和风险防控，因技术原因和网络中断等因素，可能会造成注册用户的实时操作无效和暂停，请注意备份相关资料。</span>
        </p><h5
        style="font-size:13.5pt; line-height:157%; margin:15pt 0pt 0pt; orphans:0; page-break-after:avoid; page-break-inside:avoid; text-align:justify; widows:0">
        <span style="font-family:微软雅黑; font-size:13.5pt; font-weight:bold">十、【其他规定】</span></h5>
        <p style="margin:3.75pt 0pt 0pt"><span style="font-family:微软雅黑; font-size:10.5pt">毕节市住房公积金管理中心依照</span><span
          style="font-family:微软雅黑; font-size:10.5pt">本服务</span><span style="font-family:微软雅黑; font-size:10.5pt">条款及后期依法发布的补充规则，均为本协议不可分割的组成部分，原则上不再重复另行签约。</span>
        </p>
        <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
          style="font-family:等线; font-size:10.5pt">&#xa0;</span></p></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog class="noHeader" :visible.sync="privacyVisible" :close-on-click-modal="false" fullscreen
               :show-close="false" center>
      <div class="contect">
        <div style="margin-top: 20px;">
          <div><p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
            style="font-family:黑体; font-size:22pt">毕节市住房公积金管理中心隐私保护政策</span>
          </p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋; font-size:15pt">&#xa0;</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心通过《隐私保护政策》</span><span
              style="font-family:仿宋; font-size:15pt">向您细化说明您在使用</span><span
              style="font-family:仿宋; font-size:15pt">毕节公积金相关服务</span><span style="font-family:仿宋; font-size:15pt">时我们收集、使用、存储和共享个人信息的情况，以及您所享有的相关权利等事宜：</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋; font-size:15pt">• 您可以根据</span><span
              style="font-family:仿宋; font-size:15pt">本政策</span><span
              style="font-family:仿宋; font-size:15pt">所述管理您的个人信息以及相关授权。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:仿宋; font-size:15pt">• 我们采用多方位的安全保护措施，以确保对您的个人信息保护处于合理的安全水平。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">您可以通过阅读完整版《</span><span style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心隐私保护政策</span><span
              style="font-family:仿宋; font-size:15pt">》，了解个人信息类型与用途的对应关系等更加详尽的个人信息处理规则。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">1.我们收集的信息</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">在您使用</span><span
              style="font-family:仿宋; font-size:15pt">毕节公积金相关服务</span><span
              style="font-family:仿宋; font-size:15pt">的过程中，</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心相关程序</span><span
              style="font-family:仿宋; font-size:15pt">会按照如下方式收集您在使用服务时主动提供的或因为使用服务而产生的信息，用以向您提供、优化我们的服务以及保障您的账户安全：</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">1.1 当您使用</span><span
              style="font-family:仿宋; font-size:15pt">毕节公积金相关服务</span><span style="font-family:仿宋; font-size:15pt">时，我们会收集您的网络身份标识信息及个人常用设备信息，用于标记您为</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心相关程序</span><span
              style="font-family:仿宋; font-size:15pt">的用户。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">如果您使用</span><span
              style="font-family:仿宋; font-size:15pt">微信</span><span
              style="font-family:仿宋; font-size:15pt">关联登录</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心相关程序</span><span
              style="font-family:仿宋; font-size:15pt">的，为了更好地向您提供</span><span
              style="font-family:仿宋; font-size:15pt">公积金</span><span style="font-family:仿宋; font-size:15pt">服务，改善</span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span style="font-family:仿宋; font-size:15pt">体验，我们会收集您的微信账号涉及的唯一标识以及您授权的其他信息，以及您在</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心相关程序</span><span
              style="font-family:仿宋; font-size:15pt">中的相关操作信息</span><span
              style="font-family:仿宋; font-size:15pt">。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">1.</span><span style="font-family:仿宋; font-size:15pt">2</span><span
              style="font-family:仿宋; font-size:15pt"> 根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用您的相关个人信息无需征求您的授权同意：</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">1） 与国家安全、国防安全等国家利益直接相关的；与公共安全、公共卫生、公共知情等重大公共利益直接相关的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">2） 与犯罪侦查、起诉、审判和判决执行等直接相关的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">3） 出于维护您或其他个人的生命、财产、声誉等重大合法权益但又很难得到本人同意的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">4） 所收集的个人信息是您自行向社会公众公开的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">5） 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">6） 根据您要求签订和履行合同所必需的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">7） 用于维护所提供的</span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span
              style="font-family:仿宋; font-size:15pt">的安全稳定运行所必需的，例如发现、处置</span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span style="font-family:仿宋; font-size:15pt">的故障；</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">8） 为开展合法的新闻报道所必需的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">9</span><span
              style="font-family:仿宋; font-size:15pt">） 法律法规规定的其他情形。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">1.</span><span style="font-family:仿宋; font-size:15pt">3</span><span
              style="font-family:仿宋; font-size:15pt"> 请您理解，我们向您提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了您的信息，我们会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的同意。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋; font-size:15pt">&#xa0;</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">2.信息的存储</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">2.1 信息存储的方式和期限</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们会通过安全的方式存储您的信息，包括本地存储（例如利用APP进行数据缓存）、数据库和服务器日志。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">一般情况下，我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下存储您的个人信息。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">2.2 信息存储的地域</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">2.3 </span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span
              style="font-family:仿宋; font-size:15pt">停止运营时的通知</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">当我们的</span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span
              style="font-family:仿宋; font-size:15pt">发生停止运营的情况时，我们将根据相关法律法规规定进行公告通知，并依法保障您的合法权益。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">3.信息安全</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">3.1 安全保护措施</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们努力为用户的信息安全提供保障，以防止信息的泄露、丢失、不当使用、未经授权访问和披露等。我们使用多方位的安全保护措施，以确保用户的个人信息保护处于合理的安全水平，包括技术保护手段、管理制度控制、安全体系保障等诸多方面。此外，我们的相关系统还通过了国家网络安全等级保护（三级）的备案和测评。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋; font-size:15pt">&#xa0;</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们采用业界领先的技术保护措施。我们使用的技术手段包括但不限于防火墙、加密（例如SSL）、去标识化或匿名化处理、访问控制措施等。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们建立了保障个人信息安全专门的管理制度、流程和组织。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务并进行审计，违反义务的人员会根据规定进行处罚。我们也会审查该管理制度、流程和组织，以防未经授权的人员擅自访问、使用或披露用户的信息。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们建议您在使用</span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span
              style="font-family:仿宋; font-size:15pt">时充分注意对个人信息的保护，我们也会提供多种安全功能来协助您保护自己的个人信息安全。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">3.2 安全事件处置措施</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">若发生个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大。安全事件发生后，我们会以公告、推送通知或邮件等形式告知您安全事件的基本情况、我们即将或已经采取的处置措施和补救措施，以及我们对您的应对建议。如果难以实现逐一告知，我们将通过公告等方式发布警示。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">4.我们如何使用信息</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们严格遵守法律法规的规定以及与用户的约定，按照</span><span
              style="font-family:仿宋; font-size:15pt">本政策</span><span
              style="font-family:仿宋; font-size:15pt">所述使用收集的信息，以向您提供更为优质的服务。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">4.1 信息使用规则</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们会按照如下规则使用收集的信息：</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋; font-size:15pt">&#xa0;</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">1) 我们会根据我们收集的信息向您提供各项功能与服务，包括</span><span
              style="font-family:仿宋; font-size:15pt">住房公积金提取、个人账户信息变更</span><span
              style="font-family:仿宋; font-size:15pt">等；</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">2) 我们会根据您使用</span><span style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心相关服务</span><span
              style="font-family:仿宋; font-size:15pt">的频率和情况、故障信息、性能信息等分析</span><span
              style="font-family:仿宋; font-size:15pt">我们服务</span><span style="font-family:仿宋; font-size:15pt">的运行情况，以确保服务的安全性，并优化我们的</span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span style="font-family:仿宋; font-size:15pt">，提高我们的服务质量。我们不会将我们存储在分析软件中的信息与您提供的个人身份信息相结合。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">4.2 告知变动目的后征得同意的方式</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们将会在</span><span style="font-family:仿宋; font-size:15pt">本政策</span><span
              style="font-family:仿宋; font-size:15pt">所涵盖的用途内使用收集的信息。如我们使用您的个人信息，超出了与收集时所声称的目的及具有直接或合理关联的范围，我们将在使用您的个人信息前，再次向您告知并征得您的明示同意。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">5.对外提供</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">目前，除</span><span
              style="font-family:仿宋; font-size:15pt">本政策</span><span
              style="font-family:仿宋; font-size:15pt">规定的情形之外，我们不会主动共享、提供或转让您的个人信息，如存在其他共享、提供或转让您的个人信息或您需要我们将您的个人信息共享、提供或转让至</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心</span><span style="font-family:仿宋; font-size:15pt">外的第三方情形时，我们会直接或确认该第三方征得您对上述行为的明示同意。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">除</span><span
              style="font-family:仿宋; font-size:15pt">本政策</span><span
              style="font-family:仿宋; font-size:15pt">另有规定外，我们不会对外公开披露所收集的个人信息。如必须公开披露时，我们会向您告知此次公开披露的目的、披露信息的类型及可能涉及的敏感信息，并征得您的明示同意。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋; font-size:15pt">&#xa0;</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">另外，根据相关法律法规及国家标准，以下情形中，我们可能会共享、转让、公开披露个人信息无需事先征得您的授权同意：</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">1） 与国家安全、国防安全直接相关的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">2） 与公共安全、公共卫生、重大公共利益直接相关的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">3） 与犯罪侦查、起诉、审判和判决执行等直接相关的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">4） 出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">5） 个人信息主体自行向社会公众公开个人信息的；</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">6） 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">6.您的权利</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">在您使用</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心相关服务</span><span
              style="font-family:仿宋; font-size:15pt">期间，我们可能会视</span><span
              style="font-family:仿宋; font-size:15pt">公积金服务</span><span style="font-family:仿宋; font-size:15pt">具体情况为您提供相应的操作设置，以便您可以查询、删除、更正或撤回您的相关个人信息，您可参考</span><span
              style="font-family:仿宋; font-size:15pt">相应服务</span><span style="font-family:仿宋; font-size:15pt">的具体指引进行操作。此外，我们还设置了投诉举报渠道，您的意见将会得到及时的处理。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">7.变更</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">我们可能会适时对</span><span
              style="font-family:仿宋; font-size:15pt">本政策</span><span
              style="font-family:仿宋; font-size:15pt">进行修订。当</span><span
              style="font-family:仿宋; font-size:15pt">本政策</span><span
              style="font-family:仿宋; font-size:15pt">的条款发生变更时，我们会在</span><span
              style="font-family:仿宋; font-size:15pt">服务</span><span style="font-family:仿宋; font-size:15pt">更新时以适当的方式向您提示变更后的指引。请您仔细阅读变更后的隐私保护指引或指引内容，您继续使用</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心服务</span><span style="font-family:仿宋; font-size:15pt">表示您同意我们按照更新后的隐私保护指引收集、处理或使用您的个人信息。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋; font-size:15pt">&#xa0;</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">8</span><span style="font-family:仿宋; font-size:15pt">.其他</span></p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">《</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心</span><span
              style="font-family:仿宋; font-size:15pt">隐私</span><span
              style="font-family:仿宋; font-size:15pt">保护</span><span
              style="font-family:仿宋; font-size:15pt">政策》是</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心</span><span style="font-family:仿宋; font-size:15pt">统一适用的一般性隐私条款，其中所规定的内容包括但不限于用户权利及信息安全保障措施等均适用于</span><span
              style="font-family:仿宋; font-size:15pt">毕节市住房公积金管理中心</span><span
              style="font-family:仿宋; font-size:15pt">用户。</span>
            </p>
            <p style="margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0"><span
              style="font-family:仿宋; font-size:15pt">9</span><span style="font-family:仿宋; font-size:15pt">.联系我们</span>
            </p>
            <p style="margin:0pt; orphans:0; text-indent:21pt; widows:0"><span style="font-family:仿宋; font-size:15pt">当您有其他的投诉、建议相关问题时，请通过</span><span
              style="font-family:仿宋; font-size:15pt">0857-12329</span><span style="font-family:仿宋; font-size:15pt">与我们联系。我们将尽快审核所涉问题，并在验证您的用户身份后的十五天内予以回复。</span>
            </p></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="privacyVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <CountDown v-if="countDownWarning" :text="countDownText"></CountDown>
  </div>
</template>

<script>
  import {unitLogins, readlLogin, getDynamicCode} from "../../api/user"
  import {getStore, setStore, updateDic} from "../../utils/mUtils"
  import bus from "../../utils/bus"
  import DateTime from "../../components/dateTime"
  import CountDown from "../../components/countDown"
  export default {
    name: "index",
    components: {
      DateTime, CountDown
    },
    data() {
      return {
        message: [
          {
            content: '毕节市住房公积金管理中心关于调整毕节市2020年度住房公积金月缴存额上、下限标准的通知',
            time: '2020-09-18'
          }, {
            content: '赫章县管理部多方协调，开创公积金归集新局面',
            time: '2020-09-17'
          }
        ],
        loading: false,
        loginVisible: false,
        privacyVisible: false,
        loginBox: false,
        readLoginBox: true,
        loginTitle: '个人登录',
        agreement: false,
        countDown: 60,
        countText: '获取短信验证码',
        param: {
          dwzh: '',
          password: '',
          dynamicPassword: ''
        },
        ZJHM: '',
        tempURL: '',
        tempComplaint: '',
        rules: {
          dwzh: [{required: true, message: '请输入单位账号', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          dynamicPassword: [{required: true, message: '请输入短信验证码', trigger: 'blur'}]
        },
        countDownWarning: false,
        countDownText: ''
      }
    },
    created() {
      bus.$on('countDown', data => {
        if (data > 0 && getStore('token')) {
          this.countDownWarning = true
          this.countDownText = data + '秒后退出登录'
        }
      })
      bus.$on('closeCountDown', () => {
        this.countDownWarning = false
      })
      window.setInterval(() => {
        this.$router.go(0)
      }, 3600 * 1000)
    },
    mounted() {
      this.personLogin()
    },
    methods: {
      goPage(url) {
        if (url === 'personInform' && !getStore('GRZH')) {
          this.tempComplaint = ''
          this.loginBox = true
          this.personLogin()
          return
        }
        if (url === 'unitInform' && !getStore('DWZH')) {
          this.tempComplaint = ''
          this.loginBox = true
          this.unitLogin()
          return
        }
        if (url === 'complaint' && !getStore('token')) {
          this.tempComplaint = '/complaint'
          this.loginBox = true
          this.personLogin()
          return
        }
        this.$router.push('/' + url)
      },
      unitLogin() {
        this.tempURL = '/unitInform'
        this.readLoginBox = false
        this.loginTitle = '单位登录'
        this.agreement = false
        this.ZJHM = ''
        this.param.dwzh = ''
        this.param.password = ''
        this.param.dynamicPassword = ''
      },
      personLogin() {
        this.tempURL = '/personInform'
        this.readLoginBox = true
        this.loginTitle = '个人登录'
        this.agreement = false
        this.ZJHM = ''
        this.param.dwzh = ''
        this.param.password = ''
        this.param.dynamicPassword = ''
      },
      getIdCard() {
        console.log('读取身份证')
      },
      submitReadForm () {
        if (this.ZJHM !== '') {
          if (!this.agreement) {
            this.$message.info('请先阅读和同意登录协议和隐私策略！')
            return
          }
          this.loading = true
          readlLogin(this.ZJHM, res => {
            this.loading = false
            if (res.response !== 'error') {
              window.localStorage.clear()
              setStore('token', res.token)
              setStore('GRMC', res.userInfo.grxm)
              setStore('GRZH', res.userInfo.grzh)
              setStore('ZJHM', res.userInfo.zjhm)
              updateDic()
              this.$message.success('登录成功！请操作完成后退出登录，以免信息泄露！')
              if (this.tempComplaint !== '') {
                this.$router.push(this.tempComplaint)
              } else {
                this.$router.push(this.tempURL)
              }
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('未读取到身份证！')
        }
      },
      submitForm() {
        this.$refs.login.validate(valid => {
          if (valid) {
            if (!this.agreement) {
              this.$message.info('请先阅读和同意登录协议和隐私策略！')
              return
            }
            this.loading = true
            unitLogins(this.param, res => {
              this.loading = false
              if (res.response !== 'error') {
                window.localStorage.clear()
                setStore('token', res.token)
                setStore('DWZH', res.userInfo.dwzh)
                setStore('DWMC', res.userInfo.dwmc)
                updateDic()
                this.$message.success('登录成功！请操作完成后退出登录，以免信息泄露！')
                if (this.tempComplaint !== '') {
                  this.$router.push(this.tempComplaint)
                } else {
                  this.$router.push(this.tempURL)
                }
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            return false
          }
        })
      },

      getCode() {
        if (this.param.dwzh === '' || this.param.password === '') {
          this.$message.error('单位账号和密码不可为空！')
        } else {
          getDynamicCode({dwzh: this.param.dwzh, password: this.param.password}, res => {
            if (res.response !== 'error') {
              this.$message.success(res.State)
            } else {
              this.$message.error(res.message)
            }
          })
          this.setTime()
        }
      },

      setTime() {
        if (this.countDown === 0) {
          this.countText = '获取短信验证码'
          this.countDown = 60
          return
        } else {
          this.countText = '重新发送(' + this.countDown + ')'
          this.countDown--
        }
        setTimeout(() => {
          this.setTime()
        }, 1000)
      }
    }
  }
</script>
<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/bg_loginbox.png');
    background-size: 100%;
    overflow: auto;
  }
  .login-header {
    position: relative;
    top: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    font-size: 22px;
    color: #fff;
  }
  .login-header .imgLogo {
    float: left;
    margin: 20px 40px;
    width: 500px;
  }
  .header-right {
    float: right;
    width: 150px;
    padding-right: 50px;
  }
  .model-box {
    margin: 80px 100px 100px 100px !important;
  }
  .message-box {
    font-size: 20px;
    text-align: left;
    margin: 25px 20px 20px 30px;
    list-style-type: circle;
  }
  .model-card {
    width: 100%;
    height: 300px;
    margin: 10px 10px 20px 10px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .card-content i {
    color: #fff;
    font-size: 100px;
    margin-top: 60px;
    margin-bottom: 20px;
  }
  .card-title {
    font-size: 35px;
    color: #fff;
  }
  .ms-content {
    padding: 10px 30px 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .agreement {
    margin-bottom: 20px;
  }

  .agreement-file {
    color: #20a0ff;
    cursor: pointer;
  }
</style>
