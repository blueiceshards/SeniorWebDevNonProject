/* 

LESSON 6: DELIVERY OPTIMIZATIONS

In addition to reducing download size, we can also reduce download frequency. (the traveling deliveryman). reducing the number of components a page requires proportionally reduces the number of HTTP requests it has to make. this does not mean omitting content - it just means structuring your page more efficiently. our traveling deliveryman gets tireds and there is only on eof him. 

with less trips, we are minimizing our files, and also, we are not sending every file down the wire - just the ones that we need. before using bootstrap or foundation or anything that helps with UI and adds new css files - ask yourself if they're really necessary or if you can use flexbox or cssgrid which are superb alternatives. -> dont need to DL massive bootstrap or foundation files. same with JS and JS libraries. they're convenient but not necessary. for example, jquery may not be very useful or relevant now. if you must use a library, use libraries that are lightweight and think twice before you pile on another script or library just for some cool animations. 

don't make your website full of iamges. in the past, we had something like sprites - we had one image and based on CSS positioning, you can  have on that one image multiple images that get only displayed based on the CSS that you use. have less files, and don't make the deliveryman work so hard. 

Can't we just tell the deliveryman to carry all the files at once? -> thanks to HTTP protocol, our browsers will only simultaneously download a set maximum number of files from one domain at a time (from 2-6 depending on your browser). deliveryman also has limits on the total size you can transfer. we want to minimize files and also limit these trips that the delivery man makes (i.e. fewer files). so maybe we can combine our css and js files into one. we will talk about HTTP 2 in an upcoming video and why this process might get improved in the future. 

*/