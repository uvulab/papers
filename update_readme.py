import os
import urllib.parse

path = '.'
endl = "\n"
readme = """# Useful Papers

This repository is intended to house any and all papers that might be useful to read or cite for a uvulab project.
"""

dir_excludes = ('__', path)

top_dirnames = filter(lambda d: not d.startswith(
    dir_excludes), next(os.walk(path))[1])

readme += """
## Folders

"""

readme += '\n'.join([f"- `/{dirname}` contains papers related to projects working on {dirname} data" for dirname in top_dirnames]) + endl

readme += """
## Papers

"""

for root, dirnames, files in os.walk(path):
    depth = root.count(os.sep)
    dirnames[:] = [
        dirname for dirname in dirnames if not dirname.startswith(dir_excludes)]

    if depth > 0:
        indent = ' ' * 2 * (depth - 1)
        readme += f"{indent}- `/{os.path.basename(root)}`" + 2 * endl
        subindent = ' ' * 2 * depth
        files[:] = [file for file in files if file.endswith('.pdf')]
        for f in files:
            readme += f"{subindent}- [{f.replace('.pdf', '')}]({urllib.parse.quote(os.path.join(root, f).replace(os.sep, '/').replace('./', ''))})" + endl

        if files:
            readme += endl

        if not list(filter(lambda f: not f.endswith('.md'), os.listdir(path=root))):
            readme += f"{subindent}Currently there are no {os.path.basename(root)} papers" + \
                2 * endl

with open('README.md', 'w+') as f:
    f.write(readme[:-1])
