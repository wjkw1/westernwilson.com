---
title: '{{ replaceRE `^\d{4}-\d{1,2}-\d{1,2}-` "" .File.ContentBaseName | replaceRE "-" " " | title }}'
description: ""
date: '{{ .Date }}'
slug: '{{ replaceRE `^\d{4}-\d{1,2}-\d{1,2}-` "" .File.ContentBaseName }}'
draft: true
featured: false
tags: []
---
