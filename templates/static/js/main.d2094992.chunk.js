(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,a){e.exports=a.p+"static/media/logo.3f251fc8.png"},27:function(e,t,a){e.exports=a(71)},32:function(e,t,a){},65:function(e,t,a){},67:function(e,t,a){},69:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(14),l=a.n(r),c=(a(32),a(1)),s=a(2),u=a(4),o=a(3),m=a(5),d=a(15),h=a.n(d),g=a(25),p=a.n(g),E=(a(61),a(12)),f=(a(65),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{style:{width:"100%"}},i.a.createElement("a",{href:"/"},i.a.createElement("img",{src:a(24),alt:"logo",height:this.props.height,width:this.props.width,style:{display:"block",margin:"auto"}})))}}]),t}(n.Component)),v=(a(67),a(13)),y=a.n(v),b=function(){function e(){Object(c.a)(this,e)}return Object(s.a)(e,null,[{key:"getIngredients",value:function(e){y.a.getJSON("https://recipe-guru.appspot.com/api/v1/ingredients",function(t){return e(t)})}},{key:"getRecipe",value:function(e,t){y.a.getJSON("https://recipe-guru.appspot.com/api/v1/recipe/"+e,function(e){return t(e)})}},{key:"queryRecipes",value:function(e,t,a,n,i,r){var l={ing:e};t.length>0&&(l.ingexc=t),null!=a&&(l.diet=a),n.length>0&&(l.allergy=n),"Atleast"!==i&&"Atmost"!==i||(l.match=i),this.queryRecipesWithObject(l,r)}},{key:"queryRecipesWithObject",value:function(e,t){var a=E.stringify(e,{arrayFormat:"bracket"});y.a.getJSON("https://recipe-guru.appspot.com/api/v1/recipes?"+a,function(e){return t(e)})}}]),e}();function x(e){for(var t="",a=0;a<Math.round(e.rating);a++)t+="\u2605";return i.a.createElement("p",{id:"recipeRating"},"Rating: ",t)}function N(e){return i.a.createElement("span",{className:"card statBox"},i.a.createElement("div",{className:"statHeading"},i.a.createElement("h3",null,e.heading)),i.a.createElement("hr",null),i.a.createElement("div",{className:"statValue"},i.a.createElement("p",null,e.value)))}var k=function(e){function t(e){var a;Object(c.a)(this,t);return(a=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={calories:0,categories:[],directions:[],fat:0,id:0,ingredients:[],protein:0,rating:0,sodium:0,title:""},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.getRecipe(this.props.id,function(t){return e.setState(t)})}},{key:"render",value:function(){var e=this.state.directions.map(function(e,t){return i.a.createElement("li",{className:"recipeListItem",key:t},e)}),t=this.state.ingredients.map(function(e,t){return i.a.createElement("li",{className:"recipeListItem",key:t},e)});return i.a.createElement("div",null,i.a.createElement("div",{id:"recipe"},i.a.createElement("div",{id:"recipeHeader",className:"card"},i.a.createElement("a",{href:"/"},i.a.createElement("img",{src:a(24),alt:"logo",id:"headerLogo",height:"100",width:"100"})),i.a.createElement("h1",{id:"recipeName"},this.state.title),i.a.createElement(x,{rating:this.state.rating})),i.a.createElement("div",{className:"card recipeList"},i.a.createElement("h2",{className:"recipeSubHeading"},"Ingredients"),i.a.createElement("hr",null),i.a.createElement("ul",{style:{paddingLeft:"0px"}},t)),i.a.createElement("div",{className:"card recipeList"},i.a.createElement("h2",{className:"recipeSubHeading"},"Directions"),i.a.createElement("hr",null),i.a.createElement("ol",{style:{paddingLeft:"0px"}},e)),i.a.createElement("div",{id:"stats"},i.a.createElement(N,{heading:"Calories",value:this.state.calories}),i.a.createElement(N,{heading:"Fat",value:this.state.fat}),i.a.createElement(N,{heading:"Sodium",value:this.state.sodium}),i.a.createElement(N,{heading:"Protein",value:this.state.protein}))))}}]),t}(n.Component),C=a(26);a(69);function O(e){return i.a.createElement("div",{className:"staticCard filterCard"},i.a.createElement("h4",{className:"filterSubtitle"},e.name),i.a.createElement("p",{className:"filterText"},"Less than ",i.a.createElement("input",{type:"number",className:"numberSlider",onChange:e.onChange,value:e.value}),e.unit))}function S(e){return i.a.createElement("div",null,i.a.createElement("div",{className:"column"},i.a.createElement("button",{className:"card",style:{border:"none"},onClick:function(){window.location.href="/recipe/"+e.id}},i.a.createElement("h4",{className:"recipeName"},i.a.createElement("b",null,e.title)),i.a.createElement("hr",null),i.a.createElement("p",{className:"percentage"},e.percentage,"%"),i.a.createElement("p",{className:"requiredIng"},"Requires ",i.a.createElement("b",null,e.required)," more ingredients"))))}var I=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(o.a)(t).call(this,e))).createCards=function(){var e=a.state.results.map(function(e,t){return i.a.createElement(S,{id:e.id.toString(),title:e.title,percentage:e.percentage,required:e.unmatched.length,key:e.id})}),t=[];0===e.length?t.push(i.a.createElement("h2",null,"No Results Found")):t.push(i.a.createElement("h2",null,"Showing ",e.length," Results"));for(var n=0;n<e.length;n+=4)t.push(i.a.createElement("div",{className:"row"},e.slice(n,n+4))),t.push(i.a.createElement("br",null));return t},a.state={results:[],diet:"None",caloriesMax:"",fatMax:"",sodiumMax:"",proteinMax:"",allergy:{Diary:!1,Gluten:!1,Fish:!1,Nuts:!1,Shellfish:!1},percentage:"0",rating:"0"},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"updateRecipes",value:function(){var e=this,t=Object.keys(this.state.allergy).filter(function(t){return!0===e.state.allergy[t]});b.queryRecipes(this.props._query.ing?this.props._query.ing:[],this.props._query.ingexc?this.props._query.ingexc:[],"None"===this.state.diet?null:this.state.diet,t,"Atleast",function(t){t.sort(function(e,t){return t.percentage-e.percentage});var a=t.filter(function(t){return(""===e.state.caloriesMax||t.calories<+e.state.caloriesMax)&&(""===e.state.fatMax||t.fat<+e.state.fatMax)&&(""===e.state.sodiumMax||t.sodium<+e.state.sodiumMax)&&(""===e.state.proteinMax||t.protein<+e.state.proteinMax)&&t.percentage>10*+e.state.percentage&&t.rating>=+e.state.rating});e.setState({results:a})})}},{key:"componentDidMount",value:function(){this.updateRecipes()}},{key:"setDiet",value:function(e){this.setState({diet:e.target.value})}},{key:"setAllergy",value:function(e){var t=this.state.allergy;t[e.target.value]=!t[e.target.value],this.setState({allergy:t}),console.log(e.target)}},{key:"setPercentage",value:function(e){console.log(e.target.value),this.setState({percentage:e.target.value})}},{key:"setRating",value:function(e){console.log(e.target.value),this.setState({rating:e.target.value})}},{key:"setMax",value:function(e,t){var a=this,n=new RegExp("^[0-9]+$"),i=e.match(n)?e:"";this.setState(Object(C.a)({},t,i),function(){return console.log(a.state[t])})}},{key:"applyFilter",value:function(){this.updateRecipes()}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("link",{rel:"stylesheet",href:"Results.css"}),i.a.createElement("div",{className:"filterPanel"},i.a.createElement(f,{height:"250",width:"250"}),i.a.createElement("h3",{id:"filterTitle"},"Filter Results"),i.a.createElement("button",{onClick:this.applyFilter.bind(this),className:"card filterCard",id:"applyButton"},"Apply Filter"),i.a.createElement("div",{className:"staticCard filterCard"},i.a.createElement("h4",{className:"filterSubtitle"},"Percentage Match"),i.a.createElement("input",{type:"range",className:"percentageSlider",min:"0",max:"10",value:this.state.percentage,onChange:this.setPercentage.bind(this)}),i.a.createElement("p",{className:"filterText"},"At least ",10*+this.state.percentage,"%")),i.a.createElement("div",{className:"staticCard filterCard"},i.a.createElement("h4",{className:"filterSubtitle"},"Diet"),i.a.createElement("div",{onChange:this.setDiet.bind(this)},i.a.createElement("input",{type:"radio",name:"Diet",value:"None"})," ",i.a.createElement("label",{className:"filterText"}," None ")," ",i.a.createElement("br",null),i.a.createElement("input",{type:"radio",name:"Diet",value:"Vgn"}),i.a.createElement("label",{className:"filterText"}," Vegan")," ",i.a.createElement("br",null),i.a.createElement("input",{type:"radio",name:"Diet",value:"Vgt"})," ",i.a.createElement("label",{className:"filterText"}," Vegetarian"),"  ",i.a.createElement("br",null),i.a.createElement("input",{type:"radio",name:"Diet",value:"Pesc"})," ",i.a.createElement("label",{className:"filterText"}," Pescatarian")," ",i.a.createElement("br",null))),i.a.createElement("div",{className:"staticCard filterCard"},i.a.createElement("h4",{className:"filterSubtitle"},"Allergy"),i.a.createElement("div",{onChange:this.setAllergy.bind(this)},i.a.createElement("input",{type:"checkbox",name:"Allergy",value:"Dairy"})," ",i.a.createElement("label",{className:"filterText"}," Dairy ")," ",i.a.createElement("br",null),i.a.createElement("input",{type:"checkbox",name:"Allergy",value:"Gluten"})," ",i.a.createElement("label",{className:"filterText"}," Gluten ")," ",i.a.createElement("br",null),i.a.createElement("input",{type:"checkbox",name:"Allergy",value:"Fish"})," ",i.a.createElement("label",{className:"filterText"}," Fish ")," ",i.a.createElement("br",null),i.a.createElement("input",{type:"checkbox",name:"Allergy",value:"Nuts"})," ",i.a.createElement("label",{className:"filterText"}," Nuts ")," ",i.a.createElement("br",null),i.a.createElement("input",{type:"checkbox",name:"Allergy",value:"Shellfish"})," ",i.a.createElement("label",{className:"filterText"}," Shellfish ")," ",i.a.createElement("br",null))),i.a.createElement(O,{name:"Calories",unit:" calories",onChange:function(t){return e.setMax(t.target.value,"caloriesMax")},value:this.state.caloriesMax}),i.a.createElement(O,{name:"Fat",unit:" grams",onChange:function(t){return e.setMax(t.target.value,"fatMax")},value:this.state.fatMax}),i.a.createElement(O,{name:"Sodium",unit:" milligrams",onChange:function(t){return e.setMax(t.target.value,"sodiumMax")},value:this.state.sodiumMax}),i.a.createElement(O,{name:"Protein",unit:" grams",onChange:function(t){return e.setMax(t.target.value,"proteinMax")},value:this.state.proteinMax}),i.a.createElement("div",{className:"staticCard filterCard"},i.a.createElement("h4",{className:"filterSubtitle"},"Rating"),i.a.createElement("input",{type:"range",className:"percentageSlider",min:"0",max:"5",value:this.state.rating,onChange:this.setRating.bind(this)}),i.a.createElement("p",{className:"filterText"},"At least ",this.state.rating,"/5"))),i.a.createElement("div",{className:"results"},i.a.createElement("h2",{id:"resultsTitle"},"Results"),this.createCards()))}}]),t}(n.Component),j=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"goGuru",value:function(){window.location.href="/"}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement(f,{height:"200",width:"200"}),i.a.createElement("h1",{id:"arTitle"},"404 - Page Not Found"),i.a.createElement("p",{style:{textAlign:"center"}},"The page you are looking for cannot be found, please use the following link to return to the home page:"),i.a.createElement("div",{id:"goGuru"},i.a.createElement("button",{type:"button",id:"submit",className:"card",onClick:function(){return e.goGuru()}},"GO GURU!")))}}]),t}(i.a.Component),w=h.a.Locations,M=h.a.Location,R=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(w,null,i.a.createElement(M,{path:"/",handler:F}),i.a.createElement(M,{path:"/recipe/:id",handler:k}),i.a.createElement(M,{path:"/results",handler:I}),i.a.createElement(M,{path:"*",handler:j}))}}]),t}(n.Component),F=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(o.a)(t).call(this,e))).state={ingredients:[],matchedIngredients:[],includedIngredients:[],excludedIngredients:[],input:"",selected:!1,exclude:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.getIngredients(function(t){e.setState({ingredients:t})})}},{key:"textChanged",value:function(e){var t=new RegExp(e.target.value,"i"),a=""===e.target.value?[]:this.state.ingredients.filter(function(e){return e.match(t)});this.setState({input:e.target.value,matchedIngredients:a})}},{key:"suggestionSelected",value:function(e){this.state.exclude?this.setState({excludedIngredients:this.state.excludedIngredients.concat([e])}):this.setState({includedIngredients:this.state.includedIngredients.concat([e])}),this.setState({input:"",matchedIngredients:[]})}},{key:"removeIngredient",value:function(e,t){if("inclusion"===t){var a=this.state.includedIngredients;a=a.filter(function(t){return t!==e}),this.setState({includedIngredients:a})}else{var n=this.state.excludedIngredients;n=n.filter(function(t){return t!==e}),this.setState({excludedIngredients:n})}}},{key:"toggleFocus",value:function(){this.setState({selected:!this.state.selected})}},{key:"toggleInclusion",value:function(){this.setState({exclude:!this.state.exclude})}},{key:"goGuru",value:function(){var e={ing:this.state.includedIngredients,ingexc:this.state.excludedIngredients},t=E.stringify(e,{arrayFormat:"bracket"});window.location.href="/results?"+t}},{key:"render",value:function(){var e=this,t=this.state.includedIngredients.map(function(t){return i.a.createElement(T,{key:t,ing:t,type:"inclusion",remove:function(){return e.removeIngredient(t,"inclusion")}})}),a=this.state.excludedIngredients.map(function(t){return i.a.createElement(T,{key:t,ing:t,type:"exclusion",remove:function(){return e.removeIngredient(t,"exclusion")}})}),n=this.state.matchedIngredients.map(function(t){return i.a.createElement("li",{key:t,className:"suggestedItem",onClick:function(){return e.suggestionSelected(t)}},t)});return i.a.createElement("div",null,i.a.createElement("link",{rel:"stylesheet",href:"style.css"}),i.a.createElement("title",null,"Recipe Guru"),i.a.createElement(f,{height:"200",width:"200"}),i.a.createElement("h1",{id:"arTitle"},"Recipe Guru"),i.a.createElement("div",{id:"ingredientSearch",className:"card"},i.a.createElement("div",null,i.a.createElement("input",{id:"searchField",type:"text",placeholder:"Search for ingredients...",size:20,onChange:this.textChanged.bind(this),onFocus:function(){return e.toggleFocus()},onBlur:function(){return e.toggleFocus()},value:this.state.input}),i.a.createElement("hr",null),i.a.createElement("label",null,i.a.createElement(p.a,{defaultChecked:!this.state.exclude,onChange:function(){return e.toggleInclusion()},icons:!1}),i.a.createElement("span",{id:"inclusionToggle"},this.state.exclude?"exclude mode":"include mode"))),this.state.matchedIngredients.length>0?i.a.createElement("hr",null):i.a.createElement("div",null),i.a.createElement("ul",{id:"suggestedIng"},n)),0===this.state.includedIngredients.length?i.a.createElement("div",null):i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement("h2",{className:"listLabel"},"Included Ingredients"),i.a.createElement("div",{className:"listdiv"},t)),0===this.state.excludedIngredients.length?i.a.createElement("div",null):i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement("h2",{className:"listLabel"},"Excluded Ingredients"),i.a.createElement("div",{className:"listdiv"},a)),i.a.createElement("div",{id:"goGuru"},i.a.createElement("button",{type:"button",id:"submit",className:"card",onClick:function(){return e.goGuru()}},"GO GURU!")))}}]),t}(n.Component);function T(e){var t="inclusion"===e.type?"inclusionCard listcard":"exclusionCard listcard",a="inclusion"===e.type?" cardButton inclusionCardButton":" cardButton exclusionCardButton";return i.a.createElement("div",{key:e.ing,className:t},i.a.createElement("p",null,e.ing),i.a.createElement("button",{className:a,onClick:e.remove},"Remove"))}var A=R;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,2,1]]]);
//# sourceMappingURL=main.d2094992.chunk.js.map