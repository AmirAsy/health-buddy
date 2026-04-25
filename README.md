Please read this instruction for upload your updated or created file. ( Before execute this step, please make sure you are in the RIGHT directory )
Step 1 : Create new file ( skip this part if your file is already existed )
Step 2 : Save your file in VSC
         Press : Ctrl + S
Step 3 : Make sure you are in your branch
         If NOT in your branch : Press : git checkout -b branch-name ( Please use - between spaces ) ( only run -b the first time if you want to make more than 1 branch )
Step 4 : Add file 
         Type : git add file-name.html ( add certain file ) OR git add . ( add all file )
Step 5 : Check changes 
         You should see : file-name.html
Step 6 : Commit (save your work)
         git commit -m "Title of the changes"
Step 7 : Push to GitHub
         Type : git push origin branch-name
Step 8 : Define your user
         Type : git config --global user.name "username"
                git config --global user.email "email"
Step 9 : Push to GitHub
         Type : git push origin branch-name
Step 10 : Create pull request from GitHub
          base: main
          compare: branch-name
          Title: Title of the changes
          Description: short explanation
          Then click : Create Pull Request
Step 11 : Review source code and Merge into main
          Click : Merge Pull Request
          Then : Confirm Merge
Step 12 : ( IMPORTANT ) Update your local main
          After merge, go back to VS Code:
          Type : git pull origin main
