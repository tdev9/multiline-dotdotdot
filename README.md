# Multiline dotdotdot directive
Angular directive extension. This directive fit the content to parent
size and complete the text with ... like </br>
```text-overflow: ellipsis``` in css. 
It is working with multiline text.
## Usage
```
import { MultilineDotdotdotModule } from 'multiline-dotdotdot';

@NgModule({
  imports: [
    MultilineDotdotdotModule
  ],
})
export class ExampleModule { }
```
In html
```
<span multilineDotdotdot>
   <p>Some quick example text to be rendered in p tag.</p>
</span>
```
You have to wrap text in a tag because the directive calculate with this.
## TODOs
 - Add unit tests
 - Handle html tags in rendered content
 - Add tags
 
Feel free to add feature request.
