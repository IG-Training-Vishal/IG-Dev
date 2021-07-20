// import {BaseBox} from "./BaseBox.js";

 class Brick extends BaseBox {
    constructor(props) {
        super(props);
        this.score = props.score;
    }
}