"""
    Quick python script to batch convert SVG to PNG via Inkscape
"""

import subprocess
import fnmatch
import os
import argparse

INKSCAPE = "C:\\Program Files\\Inkscape\\Inkscape.exe"

def convert(svg, png, height):
    """
        Converts an SVG to a PNG using Inkscape
    """

    cmd = [
        INKSCAPE,
        "-z",
        "-f", svg,
        "-h", height,
        "-j",
        "-e", png
    ]

    print(cmd)

    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    (stdout, stderr) = proc.communicate()

    if proc.returncode != 0:
        raise Exception("Failed to run command:\n%s\n%s" % (stdout, stderr))


def findfiles(directory, fnfilter):
    """
        Returns a list of files that match the given filter
    """

    filelist = []

    for name, subdirs, files in os.walk(directory):
        print(files)
        for file in files:
            if fnmatch.fnmatch(file, fnfilter):
                filelist.append(os.path.join(name, file))
        for subdir in subdirs:
            innerlist = findfiles(subdir, fnfilter)
            if innerlist:
                filelist.append(innerlist)

    return filelist


def main():
    """ Entry Point """

    parser = argparse.ArgumentParser(description="Process SVG files into PNGs")
    parser.add_argument("-d", "--directory", metavar="DIR")
    parser.add_argument("-o", "--out", metavar="DIR")
    parser.add_argument("-s", "--height", metavar="HEIGHT", required=True)
    args = parser.parse_args()

    directory = args.directory or os.getcwd()
    directory = os.path.abspath(directory)

    outdir = args.out or os.getcwd()
    outdir = os.path.abspath(outdir)

    print("Directory: %s" % directory)
    print("Output: %s" % outdir)

    svgs = findfiles(directory, "*.svg")
    for file in svgs:
        print("File: %s" % file)
        (_, filename) = os.path.split(file)
        (filenoext, _) = os.path.splitext(filename)
        pngout = os.path.join(outdir, filenoext + ".png")
        convert(file, pngout, args.height)

if __name__ == '__main__':
    main()
