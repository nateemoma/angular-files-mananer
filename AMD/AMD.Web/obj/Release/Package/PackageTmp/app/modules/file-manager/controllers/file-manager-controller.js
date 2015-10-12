(function () {

    'use strict'

    angular.module('amdApp').controller('FileManagerController', ['$scope', '$modal', function ($scope, $modal) {

        var stack           = new Stack();
        $scope.currentLevel = stack.GetCount();
        $scope.isPreviewAction = false;
        $scope.isOpenUploadMoal = false;

        $scope.currentLevelItems = [];
        $scope.treedata = [
            {
                "label": "User", "id": "role1", "type": "folder", "children": [
                    { "label": "subUser1", "id": "role11", "type": "txt", "children": [] },
                    {
                        "label": "subUser2", "id": "role12", "type": "folder", "children": [
                        {
                            "label": "subUser2-1", "id": "role121", "type": "folder", "children": [
                                { "label": "subUser2-1-1", "id": "role1211", "type": "txt", "children": [] },
                                { "label": "subUser2-1-2", "id": "role1212", "type": "txt", "children": [] }
                            ]
                        }
                        ]
                    }

                ]
            },
            { "label": "image01", "id": "role2", "type": "jpg", "src": "http://localhost:2086/AMDFileUpload/01.jpg", "children": [] },
            { "label": "image02", "id": "role3", "type": "png", "src": "http://localhost:2086/AMDFileUpload/02.jpg", "children": [] },
            { "label": "text file01", "id": "role3", "type": "txt", "children": [] },
            { "label": "text file02", "id": "role3", "type": "txt", "children": [] }
        ];
        stack.Push($scope.treedata);
        $scope.currentLevel = stack.GetCount();
        $scope.currentLevelItems = $scope.treedata;

        $scope.$watch('abc.currentNode', function (newObj, oldObj) {
            if ($scope.abc && angular.isObject($scope.abc.currentNode)) {
                console.log('Node Selected!!');
                console.log($scope.abc.currentNode);
            }
        }, false);

        // อัพโหลด modal
        $scope.openUploadModal = function () {
            $modal.open({
                templateUrl: 'app/modules/file-manager/views/file-upload-modal.html',
                size: 'lg',
                backdrop: 'static',
                controller: function ($scope, $modalInstance) {

                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                }
            }).result.then(function (data) {
                $scope.currentLevelItems.push({ "label": "image03", "id": "role3", "type": "png", "src": "http://localhost:2086/AMDFileUpload/02.jpg", "children": [] });
            });
        };

        // เปิดโฟลเดอร์
        $scope.openFolder = function (items) {
            $scope.currentLevelItems = items;
            stack.Push(items);
            $scope.currentLevel = stack.GetCount();
        };

        // สร้างโฟลเดอร์ใหม่
        $scope.createNewFolder = function () {
            $scope.treedata.push({ "label": "Test Create New Folder", "id": "role1211", "type": "folder", "children": [] });
            $scope.currentLevelItems = $scope.treedata;
        };

        // ย้อนกลับขึ้นไปยังโฟลเดอร์ก่อนหน้า
        $scope.levelUp = function () {

            if ($scope.currentLevelItems == stack.Peek()) {
                $scope.currentLevelItems = stack.Pop();
                $scope.currentLevelItems = stack.Peek();
            } else {
                $scope.currentLevelItems = stack.Peek();
            }
            $scope.currentLevel = stack.GetCount();
        };

        // แสดงไฟล์ภาพหรือวิดีโอ
        $scope.openPreview = function (file) {

            $scope.isPreviewAction = true;
            $scope.previewInfo = {};
            $scope.previewInfo.file = file;

            switch (file.type) {
                case 'jpg':
                    $scope.previewInfo.type = 'picture';
                    $scope.previewInfo.src = file.src;
                    $scope.previewInfo.desc = file.desc;
                    $scope.previewInfo.createdOn = file.createdOn;
                case 'png':
                    $scope.previewInfo.type = 'picture';
                    $scope.previewInfo.src = file.src;
                    $scope.previewInfo.desc = file.desc;
                    $scope.previewInfo.createdOn = file.createdOn;
                    break;
                case 'txt':

                    break;

                case 'mp4':
                case 'avi':
                case 'wmv':
                    break;
            }

        };

        // ปิดการแสดงไฟล์
        $scope.closePreview = function () {
            $scope.isPreviewAction = false;
        };

        // ดาวน์โหลดไฟล์
        $scope.download = function (file) {
            window.open('', '_bank', null);
        };

        $scope.message = 'Right click triggered';
        $scope.closeMessage = 'Context menu closed';

        $scope.panels = [
          { name: 'Panel 1' },
          { name: 'Panel 2' },
          { name: 'Panel 3' }
        ];

        $scope.addPanel = function () {
            $scope.panels.push({ name: 'Panel ' + ($scope.panels.length + 1) });
        };

        $scope.onRightClick = function (msg) {
            console.log(msg);
        };

        $scope.onClose = function (msg) {
            console.log(msg);
        };

        $scope.recreatePanels = function () {
            $scope.panels = angular.copy($scope.panels);
            console.log($scope.panels);
        }

        /*
        *   Stack implementation in JavaScript
        */

        function Stack() {
            this.top = null;
            this.count = 0;

            this.GetCount = function () {
                return this.count;
            }

            this.GetTop = function () {
                return this.top;
            }

            this.Push = function (data) {
                var node = {
                    data: data,
                    next: null
                }

                node.next = this.top;
                this.top = node;

                this.count++;
            }

            this.Peek = function () {
                if (this.top === null) {
                    return null;
                } else {
                    return this.top.data;
                }
            }

            this.Pop = function () {
                if (this.top === null) {
                    return null;
                } else {
                    var out = this.top;
                    this.top = this.top.next;
                    if (this.count > 0) {
                        this.count--;
                    }

                    return out.data;
                }
            }

            this.DisplayAll = function () {
                if (this.top === null) {
                    return null;
                } else {
                    var arr = new Array();

                    var current = this.top;
                    //console.log(current);
                    for (var i = 0; i < this.count; i++) {
                        arr[i] = current.data;
                        current = current.next;
                    }

                    return arr;
                }
            }
        }

    }]);

})()