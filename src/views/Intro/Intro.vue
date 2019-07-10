<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="card bbxx">
          <p class="title">
            <i class="fa fa-server"></i>个人头像
          <p>
          <div class="user_img">
            <img v-if="newImageUrl" :src="newImageUrl" alt="用户头像" />
            <img v-else :src="personalInfo.avatar" alt="用户头像" />
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <!--  <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              <button
                type="button"
                class="el-button filter-item el-button--primary"
                style="margin-top:10px"
              >
                <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                <span>上传头像</span>
              </button>
            </el-upload>
          </div>
        </div>
      </el-col>

      <el-col :span="16">
        <div class="card bbxx">
          <p class="title">
            <i class="fa fa-server"></i>个人信息
          <p>
          <div class="table" :model="personalInfo">
            <p>
              <span class="tit">用户名</span>{{ personalInfo.name }}
            </p>
            <p>
              <span class="tit">联系方式</span>{{ personalInfo.mobile }}
            </p>
            <p>
              <span class="tit">邮件地址：</span>{{ personalInfo.email }}
            </p>
            <p>
              <span class="tit">上次登陆时间</span>{{ personalInfo.lastUpdateTime }}
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="card kjfs">
          <div class="card kjfs">
            <p class="title">
              <i class="fa fa-th-large fa-lg"></i>快捷方式
            </p>
            <ul>
              <li>
                <router-link to="/sys/user" class="kjfs kjfs-bluee">
                  <span>
                    <i class="el-icon-service fa-2x"></i>
                  </span>
                  <span>用户管理</span>
                </router-link>
              </li>
              <li>
                <router-link to="/sys/dept" class="kjfs kjfs-pinkk">
                  <span>
                    <i class="el-icon-news fa-2x"></i>
                  </span>
                  <span>机构管理</span>
                </router-link>
              </li>
              <li>
                <router-link to="/sys/role" class="kjfs kjfs-yelloww">
                  <span>
                    <i class="el-icon-view fa-2x"></i>
                  </span>
                  <span>角色管理</span>
                </router-link>
              </li>
            </ul>
            <ul>
              <li>
                <router-link to="/sys/dict" class="kjfs kjfs-grennn">
                  <span>
                    <i class="el-icon-collection fa-2x"></i>
                  </span>
                  <span>字典管理</span>
                </router-link>
              </li>
              <li>
                <router-link to="/sys/menu" class="kjfs kjfs-purplee">
                  <span>
                    <i class="fa el-icon-menu fa-2x"></i>
                  </span>
                  <span>菜单管理</span>
                </router-link>
              </li>
              <li>
                <router-link to="/sys/log" class="kjfs kjfs-lightBluee">
                  <span>
                    <i class="el-icon-tickets fa-2x"></i>
                  </span>
                  <span>系统日志</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card bbxx">
          <p class="title">
            <i class="fa fa-server"></i>版本信息
          </p>
          <div class="table">
            <p>
              <span class="tit">当前版本</span>v1.0.0
            </p>
            <p>
              <span class="tit">基于框架</span>springboot + vue2.0全家桶
            </p>
            <p>
              <span class="tit">主要特色</span>Shiro权限权限管理
            </p>
            <p>
              <span class="tit">获取渠道</span>
              <span class="gitbox">
                <a target="_blank" href="https://github.com/Nirongxu/vue-xuAdmin.git">
                  <el-button type="primary" icon="el-icon-download" size="small">github</el-button>
                </a>
                <a target="_blank" href="https://gitee.com/nirongxu/xu-webplatform.git">
                  <el-button type="primary" icon="el-icon-download" size="small">码云</el-button>
                </a>
              </span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  name: "HomePage",
  data() {
    return {
      editable: false,
      newImageUrl: require("@/assets/user.png"),
      personalInfo: {
        id: 0,
				name: '',
				password: '123456',
				deptId: 1,
				deptName: '',
				email: 'test@qq.com',
				mobile: '13889700023',
				status: 1,
        lastUpdateTime : '2019-01-01'
      }
    };
  },
  methods: {
    //上传头像
    uploadAvatar() {
      alert("稍后补上");
    },
    handleAvatarSuccess(res, file) {
      this.newImageUrl = URL.createObjectURL(file.raw);
      alert("修改头像成功");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user")
    this.personalInfo.username = user
    this.$api.user.findByName({'name': user}).then((res) => {
        this.personalInfo = res.data
			})
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.el-row {
  margin-bottom: 20px;
}
.avatar {
  width: 80px;
  height: 80px;
}
$top: top;
$bottom: bottom;
$left: left;
$right: right;
$leftright: ($left, $right);
$pinkk: #eec2d3;
$bluee: #409eff;
$yelloww: #f4d884;
$grennn: #89dda0;
$purplee: #78a2ea;
$lightBluee: #b8d6ff;
$list: bluee pinkk yelloww grennn purplee lightBluee;
$list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
%shadow {
  background: #fff;
  -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(0, 0, 0, 0.2);
  .title {
    font-size: 14px;
    padding: 10px;
    i {
      margin-#{$right}: 5px;
    }
  }
}
@mixin flex($direction: row, $content: space-between) {
  display: flex;
  flex-direction: $direction;
  justify-content: $content;
}
.card {
  color: #666;
  @extend %shadow;
  ul {
    @include flex;
    li {
      flex: 1;
      a {
        color: #666666;
        align-items: center;
        padding-#{$top}: 20px;
        padding-#{$bottom}: 20px;
        @include flex(column);
        span {
          height: 44px;
        }
        .num {
          line-height: 44px;
          font-size: 42px;
          color: $bluee;
          margin: 0px;
        }
      }
      .kjfs-bluee {
        color: $bluee;
      }
      .kjfs-pinkk {
        color: $pinkk;
      }
      .kjfs-yelloww {
        color: $yelloww;
      }
      .kjfs-grennn {
        color: $grennn;
      }
      .kjfs-purplee {
        color: $purplee;
      }
      .kjfs-lightBluee {
        color: $lightBluee;
      }
      &:hover {
        .kjfs-bluee {
          color: #ffffff;
          background: $bluee;
        }
        .kjfs-pinkk {
          color: #ffffff;
          background: $pinkk;
        }
        .kjfs-yelloww {
          color: #ffffff;
          background: $yelloww;
        }
        .kjfs-grennn {
          color: #ffffff;
          background: $grennn;
        }
        .kjfs-purplee {
          color: #ffffff;
          background: $purplee;
        }
        .kjfs-lightBluee {
          color: #ffffff;
          background: $lightBluee;
        }
      }
    }
  }
  .table {
    padding: 21px;
    p {
      height: 52px;
      line-height: 52px;
      border: 1px solid #cccccc;
      overflow: hidden;
      border-#{$top}: none;
      @include flex(null, start);
      &:first-child {
        border-#{$top}: 1px solid #cccccc;
      }
      .tit {
        width: 90px;
        min-width: 90px;
        height: 100%;
        text-align: center;
        border-#{$right}: 1px solid #cccccc;
        margin-#{$right}: 18px;
      }
      span.gitbox {
        flex: 1;
        height: 100%;
        overflow: hidden;
        @include flex(row, start);
        a {
          &:first-child {
            margin-#{$right}: 30px;
          }
        }
      }
    }
  }
}
#lineEcharts {
  margin-#{$top}: 30px;
  padding-#{$top}: 30px;
  @extend %shadow;
}
#maintable {
  margin-#{$top}: 30px;
  padding-#{$top}: 10px;
  @extend %shadow;
}
.user_img {
  /*width: 80%;*/
  padding: 20px;
  margin: 0;
  text-align: center;
  // border: 1px solid #dee1e2;
  img {
    max-width: 130px;
    max-height: 130px;
  }
}
.user_info {
  /*padding-bottom: 20px;*/
  border: 1px solid #dee1e2;
  h2 {
    margin: 0;
    font-weight: normal;
    padding: 10px 20px;
    border-bottom: 1px solid #dee1e2;
    .i_edit {
      float: right;
      font-size: 16px;
      color: #7ab8ed;
    }
  }
}
.user_info_form,
.user_info_text {
  padding: 20px;
}
#income,
#interest {
  width: 100%;
  height: 400px;
}
.el-form-item {
  margin-bottom: 0;
}
.avatar-uploader {
  margin-bottom: 32px;
}
</style>