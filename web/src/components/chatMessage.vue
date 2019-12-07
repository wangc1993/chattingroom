<template>
  <div class="message" ref="message">
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      baseServerUrl: "http://localhost:3005",
    };
  },
  mounted(){
    switch(this.message.type){
      case 0:
        //系统提示信息
        this.$refs.message.innerHTML = `
          <div>
            <span style="background-color: #eee;display: inline-block;height: 20px;line-height: 20px;padding: 0 4px;margin-bottom: 4px;border-radius: 4px;font-size: 12px;">
              ${this.message.time}
            </span>
            <br/>
            <span style="background-color: #eee;display: inline-block;height: 20px;line-height: 20px;padding: 0 4px;border-radius: 4px;font-size: 12px;">
              ${this.message.info}
            </span>
          </div>
        `;
        break;
      case 1:
        //聊天信息(自己)
        if(this.message.infoType === 1){
          this.$refs.message.innerHTML = `
            <div style="display: flex;justify-content: flex-end;align-items: center;">
              <div>
                <div style="text-align: right;margin-bottom: 4px;">
                  ${this.message.username}
                </div>
                <div style="background-color: #0c76f180;padding: 4px;border-radius: 4px;text-align: left;">
                  ${this.message.info}
                </div>
              </div>
              <img
                style="width: 30px;height: 30px;border-radius: 15px;margin-left: 4px;min-width: 30px;"
                src=${this.baseServerUrl + '/' + (this.message.avatar ? this.message.avatar : 'default.jpg')}
                alt=${this.message.username}
              />
            </div>
          `;
          }else if(this.message.infoType === 2){
            this.$refs.message.innerHTML = `
              <div style="display: flex;justify-content: flex-end;">
                <div>
                  <div style="text-align: right;margin-bottom: 4px;">
                    ${this.message.username}
                  </div>
                  <div style="padding: 4px;border-radius: 4px;text-align: right;">
                    <img
                      style="width: 50%;border-radius: 15px;margin-left: 4px;"
                      src=${this.baseServerUrl + '/' + this.message.picAddress}
                      alt=${this.message.username}
                    />
                  </div>
                </div>
                <img
                  style="width: 30px;height: 30px;border-radius: 15px;margin-left: 4px;min-width: 30px;"
                  src=${this.baseServerUrl + '/' + (this.message.avatar ? this.message.avatar : 'default.jpg')}
                  alt=${this.message.username}
                />
              </div>
            `
          }

        break;
      case 2:
        //聊天信息(别人)
        if(this.message.infoType === 1){
          this.$refs.message.innerHTML = `
            <div style="display: flex;align-items: center;">
              <img
                style="width: 30px;height: 30px;border-radius: 15px;margin-right: 4px;min-width: 30px;"
                src=${this.baseServerUrl + '/' + (this.message.avatar ? this.message.avatar : 'default.jpg')}
                alt=${this.message.username}
              />
              <div>
                <div style="text-align: left;margin-bottom: 4px;">
                  ${this.message.username}
                </div>
                <div style="background-color: #0c76f180;padding: 4px;border-radius: 4px;text-align: left;">
                  ${this.message.info}
                </div>
              </div>
            </div>
          `;
        }else if(this.message.infoType === 2){
          this.$refs.message.innerHTML = `
            <div style="display: flex;">
              <img
                style="width: 30px;height: 30px;border-radius: 15px;margin-right: 4px;min-width: 30px;"
                src=${this.baseServerUrl + '/' + (this.message.avatar ? this.message.avatar : 'default.jpg')}
                alt=${this.message.username}
              />
              <div>
                <div style="text-align: left;margin-bottom: 4px;">
                  ${this.message.username}
                </div>
                <div style="padding: 4px;border-radius: 4px;text-align: left;">
                  <img
                    style="width: 50%;border-radius: 15px;margin-left: 4px;"
                    src=${this.baseServerUrl + '/' + this.message.picAddress}
                    alt=${this.message.username}
                  />
                </div>
              </div>
            </div>
          `
        }
        break;
    }
  }
};
</script>

<style lang="scss" scoped>
.message{
  margin-bottom: 8px;
}
</style>