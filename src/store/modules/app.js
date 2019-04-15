import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      // 0 开启 1关闭
      opened: !+Cookies.get('sidebarStatus'),
      // 动画
      withoutAnimation: true
    },
    // 设备为桌面
    device: 'desktop'
  },
  mutations: {
    // 改变进度条
    TOGGLE_SIDEBAR: state => {
      // 在cookie中存放当前进度条状态
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false
    },
    // 关闭进度条
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation
    },
    // 更改设备
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
};

export default app
