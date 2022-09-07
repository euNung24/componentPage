import "../css/index.css";
import "../css/dropdown.css";
import Dropdown from "../js/Dropdown.js";

export default {
    title: 'UIComponent/Dropdown',
    argTypes: {
        color: {
            control: { type: 'radio'},
            options: ['primary', 'secondary', "info"]
        },
    },
}

const Template = ({...args}) => {
    const template = document.createElement('template');
    template.innerHTML = `
        <div class="dropdown">
            <a class="dropdown-toggle ${args.color}">정보검색</a>
            <ul class="dropdown-menu">
                <li class="dropdown-item">
                    <a href="#">학교정보</a>
                </li>
                <li class="dropdown-item">
                    <a href="#">자격증 정보</a>
                </li>
                <li class="dropdown-item">
                    <a href="#">직업 정보</a>
                </li>
                <li class="dropdown-item">
                    <a href="#">전문가 정보</a>
                </li>
            </ul>
        </div>
    `
    new Dropdown(template.content.querySelector('.dropdown'));
    return template.content;
};


export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Primary.args = {
    color: ["primary", "secondary", "info"],
};