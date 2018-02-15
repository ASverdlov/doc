-------------------------------------------------------------------------------
Developer guidelines
-------------------------------------------------------------------------------

.. _dev_guidelines-work_on_a_bug:

===========================================================
How to work on a bug
===========================================================

Any defect, even minor, if it changes the user-visible server behavior, needs
a bug report. Report a bug at http://github.com/tarantool/tarantool/issues.

When reporting a bug, try to come up with a test case right away. Set the
current maintenance milestone for the bug fix, and specify the series.
Assign the bug to yourself. Put the status to 'In progress' Once the patch is
ready, put the bug the bug to 'In review' and solicit a review for the fix.

Once there is a positive code review, push the patch and set the status to 'Closed'

Patches for bugs should contain a reference to the respective Launchpad bug page or
at least bug id. Each patch should have a test, unless coming up with one is
difficult in the current framework, in which case QA should be alerted.

There are two things you need to do when your patch makes it into the master:

* put the bug to 'fix committed',
* delete the remote branch.

.. _dev_guidelines-commit_message:

===========================================================
How to write a commit message
===========================================================

Any commit needs a helpful message. Mind the following guidelines when committing
to any of Tarantool repositories at GitHub.

1. Separate subject from body with a blank line.
2. Try to limit the subject line to **50 characters** or so.
3. Start the subject line with a capital letter unless it prefixed with a
   subsystem name and semicolon:

   * memtx:
   * vinyl:
   * xlog:
   * replication:
   * recovery:
   * iproto:
   * net.box:
   * lua:

4.  Do not end the subject line with a period.
5.  Do not put "gh-xx", "closes #xxx" to the subject line.
6.  Use the imperative mood in the subject line.
    A properly formed Git commit subject line should always be able to complete
    the following sentence: "If applied, this commit will */your subject line here/*".
7.  Wrap the body to **72 characters** or so.
8.  Use the body to explain **what and why** vs. how.
9.  Link GitHub issues on the lasts lines
    (`see how <https://help.github.com/articles/closing-issues-via-commit-messages>`_).
10. Use your real name and real email address.
    For Tarantool team members, **@tarantool.org** email is preferred, but not
    mandatory.

A template:

.. code-block:: none

    Summarize changes in 50 characters or less

    More detailed explanatory text, if necessary.
    Wrap it to 72 characters or so.
    In some contexts, the first line is treated as the subject of the
    commit, and the rest of the text as the body.
    The blank line separating the summary from the body is critical
    (unless you omit the body entirely); various tools like `log`,
    `shortlog` and `rebase` can get confused if you run the two together.

    Explain the problem that this commit is solving. Focus on why you
    are making this change as opposed to how (the code explains that).
    Are there side effects or other unintuitive consequences of this
    change? Here's the place to explain them.

    Further paragraphs come after blank lines.

    - Bullet points are okay, too.

    - Typically a hyphen or asterisk is used for the bullet, preceded
      by a single space, with blank lines in between, but conventions
      vary here.

    Fixes: #123
    Closes: #456
    Needed for: #859
    See also: #343, #789

Some real-world examples:

* `tarantool/tarantool@2993a75 <https://github.com/tarantool/tarantool/commit/2993a75858352f101deb4a15cefd497ae6a78cf7>`_
* `tarantool/tarantool@ccacba2 <https://github.com/tarantool/tarantool/commit/ccacba28f813fb99fd9eaf07fb41bf604dd341bc>`_
* `tarantool/tarantool@386df3d <https://github.com/tarantool/tarantool/commit/386df3d3eb9c5239fc83fd4dd3292d1b49446b89>`_
* `tarantool/tarantool@076a842 <https://github.com/tarantool/tarantool/commit/076a842011e09c84c25fb5e68f1b23c9917a3750>`_

Based on [1_] and [2_].

.. _dev_guidelines-patch-review:

===========================================================
How to submit a patch for review
===========================================================

Our patch review procedure is based on **email threads**.
All iterations are kept in a single mail thread, so it is simple to navigate the
review history.

Changes prepared for review are submitted by email to patches@tarantool.org
using ``git format-patch`` and ``git send-email``. Here is the workflow:

1. First-time git setup:

   a. Configure your name and email for git:

      .. code-block:: console

          $ git config user.name "Your Name"
          $ git config user.email "your@mail.com"

   b. Configure git to detect renames and copies to make ``git format-patch``
      output easier to review:

      .. code-block:: console

          $ git config --global diff.renames copies

2. Make changes in your private branch and commit remotely.

   For every commit, please write a proper
   ":ref:`commit message <dev_guidelines-commit_message>`".

3. Use ``git format-patch`` to generate patch files for your commits.

   For a single patch:

   .. code-block:: console

       $ git format-patch -1

   For multiple patches:

   .. code-block:: console

       $ git format-patch -n --cover-letter master

   As you see, to unify multiple patches (a **patchset**) into a single thread,
   we use a **cover letter**.
   (If a patchset contains just a single patch, it is the commit message that
   plays the cover letter's role.)

   In a cover letter, please specify:

   * An answer to the question "what does the patchset do?",
     e.g. "Improve HASH index search".
     (For a single patch, the answer is in the commit message.)
   * The branch name.
     (For a single patch, this is the current branch that you can find
     inside the patch body, delimited by `---`)
   * An absolute hyperlink to the issue.
     (For a single patch, the link is in the commit message.)

   Also, to make mail parsing easier, add "PATCH" as the **subject prefix**:

   .. code-block:: console

       $ git format-patch --subject-prefix="PATCH"

   If you need to a send a next revision of the patch, please remember to
   use patch versioning in the subject prefix, for example ``v2``:

   .. code-block:: console

       $ git format-patch --subject-prefix="PATCH v2"

   To verify the generated patch files before sending, say:

   .. code-block:: console

       $ more *.patch

4. Use ``git send-email`` to send out your patch files.

   .. code-block:: console

       $ git send-email  --to patches@tarantool.org 00*.patch --in-reply-to ???

   To put updated changes derived from rebasing (force-pushing) into the same
   mail thread, use ``git send-email`` without the option ``in-reply-to``.

Also, here_ you can find some scripts which might be a handy wrapper above the
git commands suggested before.

.. _1: https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project
.. _2: https://chris.beams.io/posts/git-commit/
.. _here: https://gist.github.com/Gerold103/5471a7ddbeec346c0c845930d5bb9df4
