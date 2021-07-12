import React from "react";
import ReactDOM from "react-dom";

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

// 注册 Provider
const ThemeContext = React.createContext({
  theme: themes.dark, // 默认值
  toggleTheme: () => {}
});

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}
// 关联对应的 context
ThemedButton.contextType = ThemeContext;

function ThemeTogglerButton() {
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background, color: theme.foreground}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
      {props.children}
    </ThemedButton>
  );
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  )
}

class Context extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      // 通过箭头函数来获取对应的state，用于计算
      this.setState(state => ({
        theme:
        state.theme === themes.dark
        ? themes.light
        : themes.dark,
      }));
    };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>

        <ThemeContext.Provider value={this.state}>
          <Content />
        </ThemeContext.Provider>
        <div>
          <ThemedButton>
            <span style={{ color: 'red' }}>button without context</span>
          </ThemedButton>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Context />, document.getElementById('context'));
