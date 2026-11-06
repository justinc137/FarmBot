# AgriBot — AI-Powered Farming Assistant Prototype

A conversational Streamlit chatbot that helps Nigerian farmers with practical advice on crops, pests, soil, weather practices, and market tips. Uses a hybrid rule-based + knowledge-base approach (easily extendable to real LLMs).

## Features

- Natural language chat interface
- Knowledge base covering:
  - Major Nigerian crops (maize, cassava, rice, yam, tomato, cocoa, etc.)
  - Common pests & diseases + organic/chemical control tips
  - Soil & fertilizer guidance
  - Seasonal planting calendar (by region)
  - Basic market & post-harvest advice
- Suggested quick questions
- Chat history with clear conversation flow
- Lightweight — no external API keys required for the prototype

## Tech Stack

- Python 3.10+
- Streamlit
- Pure Python knowledge base (JSON / dict)
- Optional: ready hooks for OpenAI / Groq / local LLM

## Project Structure

```
AgriBot/
├── app/
│   └── main.py           # Streamlit chat UI
├── components/           # (reserved for future modular UI)
├── data/
│   └── knowledge_base.py # Crop, pest, soil knowledge
├── utils/
│   └── nlp_helpers.py    # Intent matching & response generation
├── requirements.txt
└── README.md
```

## Quick Start

```bash
cd AgriBot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
streamlit run app/main.py
```

Open http://localhost:8501

## Sample Questions to Try

- “When should I plant maize in Kano?”
- “How do I control fall armyworm?”
- “What fertilizer is good for cassava?”
- “Best soil for tomato?”
- “How to store yam after harvest?”
- “Current tips for rice farming in the North?”

## Extending to Real AI

Replace the rule-based matcher in `utils/nlp_helpers.py` with:

```python
# Example with Groq or OpenAI
from openai import OpenAI
client = OpenAI(api_key=..., base_url="https://api.groq.com/openai/v1")
# then call chat.completions with the knowledge base as system context
```

## License

MIT



# Pushing commits to a remote repository

Use git push to push commits made on your local branch to a remote repository.

## About `git push`

The `git push` command takes two arguments:

* A remote name, for example, `origin`
* A branch name, for example, `main`

For example:

```shell
git push REMOTE-NAME BRANCH-NAME
```

As an example, you usually run `git push origin main` to push your local changes
to your online repository.

## Renaming branches

To rename a branch, you'd use the same `git push` command, but you would add
one more argument: the name of the new branch. For example:

```shell
git push REMOTE-NAME LOCAL-BRANCH-NAME:REMOTE-BRANCH-NAME
```

This pushes the `LOCAL-BRANCH-NAME` to your `REMOTE-NAME`, but it is renamed to `REMOTE-BRANCH-NAME`.

## Dealing with "non-fast-forward" errors

If your local copy of a repository is out of sync with, or "behind," the upstream
repository you're pushing to, you'll get a message saying `non-fast-forward updates were rejected`.
This means that you must retrieve, or "fetch," the upstream changes, before
you are able to push your local changes.

For more information on this error, see [Dealing with non-fast-forward errors](/en/get-started/using-git/dealing-with-non-fast-forward-errors).

## Resolving blocked commits

To maintain the security of the repository you're pushing to, GitHub's push protection automatically protects you from accidentally committing secrets to public repositories on GitHub.com. Exposed secrets can pose serious security risks to your repository and your supply chain.
If GitHub detects that the commit you're attempting to push contains a supported secret, it blocks the push. In order to resolve the block, you should either:

* **Remove the secret** from your commit(s). For more information, see [Resolving a blocked push](/en/code-security/how-tos/secure-your-secrets/work-with-leak-prevention/push-protection-on-the-command-line#resolving-a-blocked-push).
* **Follow the provided URL** to see options to allow the push. For more information, see [Bypassing push protection](/en/code-security/how-tos/secure-your-secrets/work-with-leak-prevention/push-protection-on-the-command-line#bypassing-push-protection).

To learn more about push protection, see [Managing push protection for users](/en/code-security/how-tos/secure-your-secrets/prevent-future-leaks/manage-user-push-protection).

## Pushing tags

By default, and without additional parameters, `git push` sends all matching branches
that have the same names as remote branches.

To push a single tag, you can issue the same command as pushing a branch:

```shell
git push REMOTE-NAME TAG-NAME
```

To push all your tags, you can type the command:

```shell
git push REMOTE-NAME --tags
```

## Deleting a remote branch or tag

The syntax to delete a branch is a bit arcane at first glance:

```shell
git push REMOTE-NAME :BRANCH-NAME
```

Note that there is a space before the colon. The command resembles the same steps
you'd take to rename a branch. However, here, you're telling Git to push *nothing*
into `BRANCH-NAME` on `REMOTE-NAME`. Because of this, `git push` deletes the branch
on the remote repository.

## Remotes and forks

You might already know that [you can "fork" repositories](https://guides.github.com/overviews/forking/) on GitHub.

When you clone a repository you own, you provide it with a remote URL that tells
Git where to fetch and push updates. If you want to collaborate with the original
repository, you'd add a new remote URL, typically called `upstream`, to
your local Git clone:

```shell
git remote add upstream THEIR_REMOTE_URL
```

Now, you can fetch updates and branches from *their* fork:

```shell
git fetch upstream
# Grab the upstream remote's branches
> remote: Counting objects: 75, done.
> remote: Compressing objects: 100% (53/53), done.
> remote: Total 62 (delta 27), reused 44 (delta 9)
> Unpacking objects: 100% (62/62), done.
> From https://github.com/OCTOCAT/REPO
>  * [new branch]      main     -> upstream/main
```

When you're done making local changes, you can push your local branch to GitHub
and [initiate a pull request](/en/pull-requests/reference/pull-requests).

For more information on working with forks, see [Syncing a fork](/en/pull-requests/how-tos/work-with-forks/syncing-a-fork).

## Further reading

* [The "Remotes" chapter from the "Pro Git" book](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes)
* [`git remote` main page](https://git-scm.com/docs/git-remote.html)
* [Git cheatsheet](/en/get-started/git-basics/git-cheatsheet)
* [Git workflows](/en/get-started/git-basics/git-workflows)
* [Git Handbook](https://guides.github.com/introduction/git-handbook/)
* [Troubleshooting the 2 GiB push limit](/en/get-started/using-git/troubleshooting-the-2-gb-push-limit)