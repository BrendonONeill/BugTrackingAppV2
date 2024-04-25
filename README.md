# Bug Tracking App V2
This is an updated version of the bug tracking app where I have moved over to next js from express. I wanted to update the backend and clean up the UI for the Bug Tracker.

## UI update
### New UI in Next.js
This UI will change as I clean up the app and it goes live. 

<img src="public/new-bug-1.png" height="500"> <img src="public/new-bug-2.png" height="500">

### Old UI in EJS
<img src="public/old-bug-1.png" height="500"> <img src="public/old-bug-2.png" height="500">
 

## Updated
- Favicon updated
- Cleaned up cursor on hover
- Sorted out the wrong nav showing for admins and users.
- Fixed a bug with the login page.
- Prevented Email dup's.
- Delete user card feedback on UI.
- Bug with cookie notice needed to fix the time to expire.

## Working on
- Comment section under bugs.
- Fixing up Cookie UI.
- Updating nav with a new tab for recycling bin.
- Added loading UI when logging in.
- Recycling bin section where to restore bugs.
- Need to speed up login time.

## Extra features to add
- Adding a project section to create new projects and find bugs to do with that project.

## Bug
- (New) When recycling a bug the timer seems to hit 0 and enter the minus numbers. the data in the recycling bin should be removed after 30 days.
- On first load there is an infinite loop on the card animation need to wait until a time then cancel animation.
- On first login sometimes the bug cards will not load in without a refresh. 


