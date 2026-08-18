# Git History Rewriting & Recovery Cheat Sheet

> A practical guide to rewriting Git history, cleaning commits, and recovering lost work.

---

# Table of Contents

1. [Amending Commits](#amending-commits)
2. [Interactive Rebase](#Interactive-Rebase)
3. [Squashing Commits](#Squashing-Commits)
4. [Splitting Commits](#Splitting-Commits)
5. [Dropping Commits](#Dropping-Commits)
6. [Reordering Commits](#Reordering-Commits)
7. [Cherry-picking Commits](#Cherry-picking-Commits)
8. [Git Reflog](#Git-Reflog)
9. [Useful Commands](#Useful-Commands)
10. [Best Practices](#Best-Practices)

---

# Amending Commits

`git commit --amend` allows you to modify the **most recent commit**.

You can:

* Change the commit message
* Add forgotten files
* Remove staged changes
* Improve commit descriptions

### Change only the commit message

```bash
git commit --amend -m "feature: Add authentication"
```

### Add forgotten files to the last commit

```bash
git add forgotten_file.py
git commit --amend
```

Git replaces the previous commit with a new one (new commit hash).

---

# Interactive Rebase

Interactive rebase allows you to **rewrite commit history**.

```bash
git rebase -i HEAD~N
```

Example:

```bash
git rebase -i HEAD~4
```

This opens the last **4 commits** in your editor.

Example:

```text
pick a123 Add login page
pick b234 Fix CSS
pick c345 Remove debug print
pick d456 Add authentication
```

Git executes these commands **from top to bottom**.

---

## Interactive Rebase Commands

| Command  | Purpose                                                    |
| -------- | ---------------------------------------------------------- |
| `pick`   | Keep the commit unchanged                                  |
| `reword` | Edit only the commit message                               |
| `edit`   | Pause to modify commit contents                            |
| `squash` | Merge commit into the previous one and edit the message    |
| `fixup`  | Merge commit into the previous one and discard its message |
| `drop`   | Remove the commit completely                               |

---

# Squashing Commits

Squashing combines multiple commits into one.

Example history:

```text
A
B
C
```

Suppose `C` belongs with `B`.

Interactive rebase:

```text
pick   B
squash C
```

Git creates

```text
B'
```

containing both commits.

After saving, Git asks for a new commit message.

Example:

```text
feat: Implement authentication
```

---

> ## Squash vs Fixup

### squash

```text
  pick B
  squash C
  ```

* Combines commits
* Lets you edit the final commit message

---

### fixup

```text
pick B
fixup C
```

* Combines commits
* Keeps B's message automatically

---

# Splitting a Commit

Suppose one commit contains unrelated changes.

Original:

```text
A
B
C
```

where `B` contains:

* Authentication
* CSS
* README

Split it into multiple commits.

### Step 1

```bash
git rebase -i HEAD~2
```

Change:

```text
pick B
```

to

```text
edit B
```

---

### Step 2

When Git pauses:

```bash
git reset HEAD^
```

This removes commit **B** but keeps all its changes in your working directory.

---

### Step 3

Create smaller commits.

```bash
git add login.py
git commit -m "feat: Add authentication"
```

```bash
git add style.css
git commit -m "style: Add login styling"
```

```bash
git add README.md
git commit -m "docs: Add README"
```

---

### Step 4

Continue:

```bash
git rebase --continue
```

---

## Helpful command

Stage only part of a file:

```bash
git add -p
```

This lets you split changes inside the same file into different commits.

---

# Dropping Commits

Delete a commit from history.

Interactive rebase:

```text
pick A
drop B
pick C
```

or simply remove the line entirely.

Result:

```text
A
C'
```

Use only for commits you no longer need.

---

# Reordering Commits

Git replays commits **in the order they appear**.

Original:

```text
pick A
pick B
pick C
```

Reordered:

```text
pick C
pick A
pick B
```

Git replays:

1. C
2. A
3. B

Be careful when commits depend on each other.

---

# Cherry-picking Commits

Cherry-pick copies **specific commits** from another branch.

Example:

```text
main

A──B──C

feature

     D──E──F
```

Copy only commit `E`:

```bash
git switch main
git cherry-pick <commit_hash>
```

Result:

```text
main

A──B──C──E'
```

Only the selected commit is copied.

---

## Cherry-pick multiple commits

```bash
git cherry-pick commit1 commit2 commit3
```

or

```bash
git cherry-pick first_commit^..last_commit
```

---

## Useful options

Continue after conflict:

```bash
git cherry-pick --continue
```

Abort:

```bash
git cherry-pick --abort
```

Apply without committing:

```bash
git cherry-pick --no-commit <commit_hash>
```

---

# Git Reflog

Unlike `git log`, reflog records **every movement of HEAD**.

This includes:

* commits
* resets
* rebases
* merges
* checkouts
* branch switches

View reflog:

```bash
git reflog
```

Example:

```text
8c12345 HEAD@{0}: commit: Add login
1ab2345 HEAD@{1}: rebase finished
2bc3456 HEAD@{2}: checkout: moving from feature to main
```

---

## Recover a lost commit

Return to an old state:

```bash
git reset --hard HEAD@{2}
```

or

```bash
git reset --hard 1ab2345
```

---

## Create a branch from a lost commit

```bash
git branch recovered HEAD@{3}
```

This is one of the safest recovery techniques in Git.

---

# Useful Commands

## View history

```bash
git log
```

Compact history

```bash
git log --oneline
```

Graph view

```bash
git log --oneline --graph --all
```

---

## Show commit details

```bash
git show
```

Show a specific commit

```bash
git show <commit_hash>
```

---

## Find commit hash

```bash
git log --oneline
```

---

## Continue rebase

```bash
git rebase --continue
```

---

## Abort rebase

```bash
git rebase --abort
```

---

## Skip problematic commit

```bash
git rebase --skip
```

---

## Continue cherry-pick

```bash
git cherry-pick --continue
```

---

## Abort cherry-pick

```bash
git cherry-pick --abort
```

---

## Undo the last commit but keep changes

```bash
git reset HEAD^
```

---

## Unstage files

```bash
git reset
```

---

## Stage parts of a file

```bash
git add -p
```

---

# Best Practices

* Write meaningful commit messages.

* Keep each commit focused on one logical change.

* Squash "fix typo", "forgot file", and similar commits before pushing.

* Split large commits into smaller logical units.

* Use `git add -p` to create clean commits.

* Use `git reflog` before assuming work is lost.

* Prefer `git push --force-with-lease` over `git push --force` after rewriting history.

---

# Quick Reference

| Task                 | Command                           |
| -------------------- | --------------------------------- |
| Amend last commit    | `git commit --amend`              |
| Edit last message    | `git commit --amend -m "message"` |
| Interactive rebase   | `git rebase -i HEAD~N`            |
| Continue rebase      | `git rebase --continue`           |
| Abort rebase         | `git rebase --abort`              |
| Skip current commit  | `git rebase --skip`               |
| Split commit         | `edit` + `git reset HEAD^`        |
| Stage part of a file | `git add -p`                      |
| Cherry-pick commit   | `git cherry-pick <hash>`          |
| Continue cherry-pick | `git cherry-pick --continue`      |
| Abort cherry-pick    | `git cherry-pick --abort`         |
| View reflog          | `git reflog`                      |
| Recover using reflog | `git reset --hard HEAD@{N}`       |
| View compact history | `git log --oneline`               |
| View commit graph    | `git log --oneline --graph --all` |

---

## Key Takeaways

* **Amend** modifies the latest commit.
* **Interactive rebase** rewrites commit history.
* **Squash** combines multiple commits into one.
* **Edit + reset** splits one commit into multiple commits.
* **Drop** removes unwanted commits.
* **Reordering** changes the sequence in which commits are replayed.
* **Cherry-pick** copies selected commits between branches.
* **Reflog** is Git's safety net for recovering lost commits and branch states.
